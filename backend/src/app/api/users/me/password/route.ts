import { prisma } from "@/lib/prisma";
import { requireAuth, ok, badRequest, serverError, validationError } from "@/lib/utils";
import { changePasswordSchema } from "@/schemas/auth.schema";
import bcrypt from "bcryptjs";

// ─── PUT /api/users/me/password ───────────────────────────────────────────────
// Securely changes the authenticated user's password
export async function PUT(request: Request) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const { currentPassword, newPassword } = parsed.data;

    // ── Fetch current hashed password ────────────────────────────────────────
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { hashedPassword: true },
    });

    if (!user?.hashedPassword) {
      return badRequest("No password set for this account");
    }

    // ── Verify current password ──────────────────────────────────────────────
    const passwordMatch = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!passwordMatch) {
      return badRequest("Current password is incorrect");
    }

    // ── Hash and save new password ───────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { hashedPassword },
    });

    return ok({ message: "Password updated successfully" });
  } catch (error) {
    return serverError(error);
  }
}
