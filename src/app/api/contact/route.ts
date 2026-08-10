import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
const TO_EMAIL = "jmlasterminguito@gmail.com";

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
      { success: false, message: "reCAPTCHA is not configured." },
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

  // CAPTCHA verified. Now send the email via Gmail SMTP.
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailAppPassword) {
    return NextResponse.json(
      { success: false, message: "Email service is not configured." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: gmailUser,
      to: TO_EMAIL,
      replyTo: body.email.trim(),
      subject: `New contact message from ${body.name.trim()}`,
      text: `Name: ${body.name.trim()}\nEmail: ${body.email.trim()}\n\nMessage:\n${body.message.trim()}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Message sent." },
    { status: 200 }
  );
}