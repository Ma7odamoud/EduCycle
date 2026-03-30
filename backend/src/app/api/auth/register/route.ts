import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/auth.schema";
import { created, badRequest, serverError, validationError } from "@/lib/utils";
import { verifyOtp, deleteOtp } from "@/lib/otp-store";
import { z } from "zod";

// Extend the register schema to require the OTP code
const registerWithOtpSchema = registerSchema.extend({
  otp: z.string().length(4, "OTP must be exactly 4 digits"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ── Validate input ───────────────────────────────────────────────────────
    const parsed = registerWithOtpSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { name, email, password, phoneNumber, role, otp } = parsed.data;

    // ── Verify OTP ───────────────────────────────────────────────────────────
    if (!verifyOtp(email, otp)) {
      return badRequest("Invalid or expired verification code. Please request a new one.");
    }

    // ── Check for duplicate email ────────────────────────────────────────────
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return badRequest("An account with this email already exists");
    }

    // ── Check for duplicate phone ────────────────────────────────────────────
    const existingPhone = await prisma.user.findFirst({ where: { phoneNumber } });
    if (existingPhone) {
      return badRequest("This phone number is already registered to another account");
    }

    // ── Hash password ────────────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 12);

    // ── Create user ──────────────────────────────────────────────────────────
    const user = await prisma.user.create({
      data: { name, email, hashedPassword, phoneNumber, role },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
    });

    // ── Clean up OTP ─────────────────────────────────────────────────────────
    deleteOtp(email);

    return created(user);
  } catch (error) {
    return serverError(error);
  }
}
