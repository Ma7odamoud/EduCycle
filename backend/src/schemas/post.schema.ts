import { z } from "zod";

// ─── Create Post ─────────────────────────────────────────────────────────────
export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "Post content cannot be empty")
    .max(5000, "Post content must be at most 5000 characters"),
  mediaUrl: z.string().url("Media URL must be a valid URL").nullish(),
  tags: z.array(z.string().max(30)).max(5).optional().default([]),
});

// ─── Update Post ─────────────────────────────────────────────────────────────
export const updatePostSchema = createPostSchema.partial().omit({ tags: true });

// ─── Create Comment ───────────────────────────────────────────────────────────
export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must be at most 1000 characters"),
  parentId: z.string().cuid("Invalid parent comment ID").optional(), // For thread replies
});

// ─── Update Comment ───────────────────────────────────────────────────────────
export const updateCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must be at most 1000 characters"),
});

// ─── Feed Query ───────────────────────────────────────────────────────────────
export const feedQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  authorId: z.string().cuid().optional(), // Filter by a specific user's posts
});

// ─── Inferred types ──────────────────────────────────────────────────────────
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type FeedQueryInput = z.infer<typeof feedQuerySchema>;
