import { z } from "zod";

const ProductCategoryEnum = z.enum([
  "BOOK",
  "TOOL",
  "ELECTRONICS",
  "CLOTHING",
  "FURNITURE",
  "OTHER",
]);

// ─── Create Product ───────────────────────────────────────────────────────────
// phoneNumber is NO LONGER accepted from the client — it is auto-populated
// from the logged-in user's profile in the POST handler.
export const createProductSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(120, "Title must be at most 120 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(2000, "Description must be at most 2000 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  isFree: z.boolean().optional().default(false),
  category: ProductCategoryEnum.optional().default("BOOK"),
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .max(4, "A maximum of 4 images are allowed")
    .optional()
    .default([]),
});

// ─── Update Product ───────────────────────────────────────────────────────────
export const updateProductSchema = createProductSchema.partial();

// ─── Query / Filter ───────────────────────────────────────────────────────────
export const productQuerySchema = z.object({
  category: ProductCategoryEnum.optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  search: z.string().max(100).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});

// ─── Inferred types ──────────────────────────────────────────────────────────
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
