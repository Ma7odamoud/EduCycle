import { prisma } from "@/lib/prisma";
import {
  requireAuth,
  ok,
  forbidden,
  notFound,
  validationError,
  serverError,
} from "@/lib/utils";
import { updateProductSchema } from "@/schemas/product.schema";

// ─── Shared: resolve product and verify ownership ─────────────────────────────
async function getProductOrFail(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { seller: { select: { id: true, name: true, avatar: true } } },
  });
  return product;
}

// ─── GET /api/products/[id] ───────────────────────────────────────────────────
// Public — get a single product by ID
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductOrFail(params.id);
    if (!product) return notFound("Product not found");
    return ok(product);
  } catch (error) {
    return serverError(error);
  }
}

// ─── PUT /api/products/[id] ───────────────────────────────────────────────────
// Protected — update a product; ONLY the seller can update their own listing
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    // ── Ownership check via DB query ─────────────────────────────────────────
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      select: { sellerId: true },
    });
    if (!product) return notFound("Product not found");

    if (
      product.sellerId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return forbidden("You can only edit your own listings");
    }

    const body = await request.json();
    const parsed = updateProductSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: parsed.data,
      include: { seller: { select: { id: true, name: true, avatar: true } } },
    });

    return ok(updated);
  } catch (error) {
    return serverError(error);
  }
}

// ─── DELETE /api/products/[id] ────────────────────────────────────────────────
// Protected — delete a product; ONLY the seller (or admin) can delete
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { session, error } = await requireAuth(request);
    if (error) return error;

    // ── Ownership check via DB query ─────────────────────────────────────────
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      select: { sellerId: true },
    });
    if (!product) return notFound("Product not found");

    if (
      product.sellerId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return forbidden("You can only delete your own listings");
    }

    await prisma.product.delete({ where: { id: params.id } });

    return ok({ message: "Product deleted successfully" });
  } catch (error) {
    return serverError(error);
  }
}
