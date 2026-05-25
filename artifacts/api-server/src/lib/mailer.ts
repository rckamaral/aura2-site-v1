import nodemailer from "nodemailer";
import { logger } from "./logger";

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    logger.warn("SMTP not configured — e-mail sending disabled");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const transport = createTransport();
  if (!transport) {
    logger.warn({ to }, "SMTP not configured, skipping e-mail");
    return;
  }

  const from = process.env.SMTP_USER;

  await transport.sendMail({
    from: `"Aura2 - Season 1" <${from}>`,
    to,
    subject: "Recuperação de Senha — Aura2",
    html: `
      <div style="background:#0d0a06;color:#fff;font-family:Arial,sans-serif;padding:40px;max-width:500px;margin:auto;border-radius:8px">
        <h1 style="color:#d4a017;text-align:center">AURA 2</h1>
        <h2 style="text-align:center;margin-bottom:24px">Recuperação de Senha</h2>
        <p>Recebemos um pedido para redefinir a senha da tua conta.</p>
        <p>Clica no botão abaixo para criar uma nova senha:</p>
        <div style="text-align:center;margin:32px 0">
          <a href="${resetUrl}" style="background:#d4a017;color:#000;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;display:inline-block">
            Redefinir Senha
          </a>
        </div>
        <p style="color:#888;font-size:12px">Este link expira em 1 hora. Se não pediste a recuperação, ignora este e-mail.</p>
      </div>
    `,
  });

  logger.info({ to }, "Password reset e-mail sent");
}
