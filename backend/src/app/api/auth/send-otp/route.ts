import { prisma } from "@/lib/prisma";
import { badRequest, serverError } from "@/lib/utils";
import { storeOtp } from "@/lib/otp-store";
import { sendOtpEmail } from "@/lib/mailer";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  phoneNumber: z.string().min(7),
});

// ─── POST /api/auth/send-otp ──────────────────────────────────────────────────
// Called before registration. Validates email + phone uniqueness, then emails OTP.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Invalid email or phone number");
    }

    const { email, phoneNumber } = parsed.data;

    // ── Check email uniqueness ────────────────────────────────────────────────
    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) {
      return badRequest("An account with this email already exists");
    }

    // ── Check phone uniqueness ────────────────────────────────────────────────
    const phoneExists = await prisma.user.findFirst({ where: { phoneNumber } });
    if (phoneExists) {
      return badRequest("This phone number is already registered to another account");
    }

    // ── Generate & store OTP, send email ─────────────────────────────────────
    const code = storeOtp(email);
    await sendOtpEmail(email, code);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return serverError(error);
  }
}
