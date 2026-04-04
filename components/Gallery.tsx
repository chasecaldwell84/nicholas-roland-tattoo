"use client";

import React, { useMemo, useState } from "react";

type Img = { src: string; alt: string };

export default function Gallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Img | null>(null);

  const cols = useMemo(() => {
    // simple “masonry-ish” via columns
    return "columns-2 md:columns-3 lg:columns-4";
  }, []);

  return (
    <>
      <div className={`${cols} gap-3 space-y-3`}>
        {images.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => {
              setActive(img);
              setOpen(true);
            }}
            className="block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 transition"
          >
            <div className="relative w-full">
              <img
                src={img.src}
                alt={img.alt}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>

      {open && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black"
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

            <div className="relative aspect-[4/3] w-full">
              <img
                src={active.src}
                alt={active.alt}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
