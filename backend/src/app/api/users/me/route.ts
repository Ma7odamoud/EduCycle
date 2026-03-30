import { prisma } from "@/lib/prisma";
import { requireAuth, ok, serverError, validationError, notFound } from "@/lib/utils";
import { updateProfileSchema } from "@/schemas/auth.schema";

// ─── GET /api/users/me ────────────────────────────────────────────────────────
// Returns the fully-hydrated profile of the currently authenticated user
export async function GET(request: Request) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            products: true,
            posts: true,
          },
        },
      },
    });

    if (!user) return notFound("User not found");

    return ok(user);
  } catch (error) {
    return serverError(error);
  }
}

// ─── PUT /api/users/me ────────────────────────────────────────────────────────
// Updates name, bio, phoneNumber, and/or avatar of the current user
export async function PUT(request: Request) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
    });

    return ok(updated);
  } catch (error) {
    return serverError(error);
  }
}
