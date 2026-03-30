import { z } from "zod";

// ─── Register ────────────────────────────────────────────────────────────────
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  phoneNumber: z
    .string()
    .min(7, "Phone number is too short")
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number format"),
  role: z.enum(["BUYER", "SELLER"]).optional().default("BUYER"),
});

// ─── Login ───────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Update Profile ──────────────────────────────────────────────────────────
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(60).optional(),
  bio: z.string().max(500).optional().nullable(),
  phoneNumber: z
    .string()
    .min(7)
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number format")
    .optional()
    .nullable(),
  avatar: z.string().url("Must be a valid URL").optional().nullable(),
});

// ─── Change Password ─────────────────────────────────────────────────────────
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

// ─── Inferred types ──────────────────────────────────────────────────────────
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
