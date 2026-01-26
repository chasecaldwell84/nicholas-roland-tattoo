import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  referencePhotos: f({ image: { maxFileSize: "8MB", maxFileCount: 8 } }).onUploadComplete(
    async ({ file }) => {
      return { url: file.url };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
