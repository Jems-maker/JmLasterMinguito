declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
    readonly RECAPTCHA_SECRET_KEY: string;
    readonly GMAIL_USER: string;
    readonly GMAIL_APP_PASSWORD: string;
  }
}
