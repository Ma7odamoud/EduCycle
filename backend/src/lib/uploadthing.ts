import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

const f = createUploadthing();

// ─── File Router ─────────────────────────────────────────────────────────────
export const ourFileRouter: FileRouter = {
  // ── Product Images ─────────────────────────────────────────────────────────
  productImageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
  })
    .middleware(async ({ req }) => {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token?.id) throw new Error("Unauthorized");
      return { userId: token.id as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(`[Uploadthing] Product image uploaded by ${metadata.userId}: ${file.url}`);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // ── Post Media ─────────────────────────────────────────────────────────────
  postMediaUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
    video: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token?.id) throw new Error("Unauthorized");
      return { userId: token.id as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(`[Uploadthing] Post media uploaded by ${metadata.userId}: ${file.url}`);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // ── User Avatar ────────────────────────────────────────────────────────────
  // Automatically saves the uploaded avatar URL to the User table in the DB
  avatarUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token?.id) throw new Error("Unauthorized");
      return { userId: token.id as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // ── Instantly persist avatar URL to DB ─────────────────────────────────
      await prisma.user.update({
        where: { id: metadata.userId },
        data: { avatar: file.url },
      });
      console.log(`[Uploadthing] Avatar updated for user ${metadata.userId}: ${file.url}`);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
};

export type OurFileRouter = typeof ourFileRouter;
