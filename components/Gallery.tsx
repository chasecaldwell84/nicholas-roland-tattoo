"use client";

import Image from "next/image";
import React, { useState } from "react";

type Img = { src: string; alt: string };

export default function Gallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Img | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => {
              setActive(img);
              setOpen(true);
            }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 transition"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1200}
              height={1200}
              className="h-auto w-full object-cover"
            />
          </button>
        ))}
      </div>

      {open && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="text-sm text-white/70">{active.alt}</div>
              <button
                className="rounded-xl border border-white/15 px-3 py-1 text-xs text-white/80 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="relative aspect-square w-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
