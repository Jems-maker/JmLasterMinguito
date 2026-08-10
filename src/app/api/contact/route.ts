import { NextResponse } from "next/server";

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(data: ContactRequest): string | null {
  const name = data.name?.trim();
  const email = data.email?.trim();
  const message = data.message?.trim();

  if (!name || name.length < 1 || name.length > 100) {
    return "Name is required and must be under 100 characters.";
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return "A valid email address is required.";
  }

  if (!message || message.length < 1 || message.length > 5000) {
    return "Message is required and must be under 5000 characters.";
  }

  return null;
}

export async function POST(request: Request): Promise<Response> {
  let body: ContactRequest;
  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const validationError = validateContact(body);
  if (validationError) {
    return NextResponse.json(
      { success: false, message: validationError },
      { status: 400 }
    );
  }

  const captchaToken = body.captchaToken?.trim();
  if (!captchaToken) {
    return NextResponse.json(
      { success: false, message: "Please complete the reCAPTCHA." },
      { status: 400 }
    );
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { success: false, message: "Server configuration error." },
      { status: 500 }
    );
  }

  let recaptchaResult: RecaptchaResponse;
  try {
    const verificationResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: captchaToken,
        }),
      }
    );

    if (!verificationResponse.ok) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA verification failed." },
        { status: 503 }
      );
    }

    recaptchaResult = (await verificationResponse.json()) as RecaptchaResponse;
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not verify reCAPTCHA. Please try again." },
      { status: 500 }
    );
  }

  if (!recaptchaResult.success) {
    return NextResponse.json(
      { success: false, message: "reCAPTCHA verification failed." },
      { status: 403 }
    );
  }

  // CAPTCHA verified. The contact message is accepted.
  // Email delivery (e.g. Resend/Nodemailer) can be wired in here later.
  return NextResponse.json(
    { success: true, message: "Message sent." },
    { status: 200 }
  );
}