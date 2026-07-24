import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * SMTP transport factory. Reads credentials from env at call time
 * (never at import time) so the app builds fine without them.
 */
export function getSmtpConfig() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_TO,
  } = process.env;

  const configured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

  return {
    configured,
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 465,
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : true,
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: SMTP_FROM || SMTP_USER,
    to: CONTACT_TO || SMTP_USER,
  };
}

let cached: Transporter | null = null;

export function getTransporter(): Transporter | null {
  const cfg = getSmtpConfig();
  if (!cfg.configured) return null;
  if (cached) return cached;

  cached = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });
  return cached;
}

/** Escape user input before embedding it in the HTML email body. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
