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
<div className="rounded-2xl border border-white/15 bg-black/30 p-4">
<UploadButton<OurFileRouter>
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
"rounded-xl bg-white px-4 py-2 text-black text-sm font-semibold shadow hover:opacity-90",
container: "flex flex-col gap-2",
allowedContent: "text-xs text-white/60",
}}
/>
<p className="mt-2 text-xs text-white/50">
Upload 1–8 reference images (required).
</p>
</div>
);
}