"use client";

import React from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function ReferenceUploader({
  onUploaded,
}: {
  onUploaded: (urls: string[]) => void;
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-black/30 p-3 sm:rounded-2xl sm:p-4">
      <UploadButton<OurFileRouter, "referencePhotos">
        endpoint="referencePhotos"
        onClientUploadComplete={(res) => {
          const urls = (res || []).map((f) => f.url);
          onUploaded(urls);
        }}
        onUploadError={(error: Error) => {
          alert(`Upload error: ${error.message}`);
        }}
        appearance={{
          button:
            "rounded-lg bg-white px-3 py-2 text-[13px] font-semibold text-black shadow hover:opacity-90 sm:rounded-xl sm:px-4 sm:text-sm",
          container: "flex flex-col gap-2",
          allowedContent: "text-[11px] text-white/60 sm:text-xs",
        }}
      />
      <p className="mt-2 text-[11px] text-white/50 sm:text-xs">Upload 1-8 reference images (optional).</p>
    </div>
  );
}
