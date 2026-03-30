import nodemailer from "nodemailer";

// ─── Gmail SMTP transporter ───────────────────────────────────────────────────
// Set SMTP_USER = your Gmail address  (e.g. yourapp@gmail.com)
// Set SMTP_PASS = a Gmail App Password (NOT your normal password)
// Generate one at: Google Account → Security → 2-Step Verification → App Passwords

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send a 4-digit OTP email to the given address.
 */
export async function sendOtpEmail(to: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: `"EduCycle" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your EduCycle verification code",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;border:1px solid #e0e0e0;border-radius:12px">
        <h2 style="color:#2e7d32;margin-top:0">EduCycle Email Verification</h2>
        <p style="color:#555">Use the code below to verify your email address. It expires in <strong>10 minutes</strong>.</p>
        <div style="text-align:center;margin:32px 0">
          <span style="font-size:42px;font-weight:700;letter-spacing:12px;color:#1a1a1a">${code}</span>
        </div>
        <p style="color:#888;font-size:13px">If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}
