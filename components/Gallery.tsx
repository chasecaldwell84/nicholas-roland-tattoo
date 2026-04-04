"use client";

import React, { useRef, useState } from "react";

type Img = { src: string; alt: string };

export default function Gallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const active = activeIndex === null ? null : images[activeIndex];

  function slide(direction: "prev" | "next") {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = Math.min(420, Math.max(260, track.clientWidth * 0.75));
    const amount = direction === "next" ? cardWidth : -cardWidth;
    track.scrollBy({ left: amount, behavior: "smooth" });
  }

  function moveActive(direction: "prev" | "next") {
    if (activeIndex === null) return;
    const nextIndex =
      direction === "next"
        ? (activeIndex + 1) % images.length
        : (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(nextIndex);
  }

  return (
    <>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                setOpen(true);
              }}
              className="snap-start shrink-0 w-[82%] sm:w-[58%] md:w-[42%] lg:w-[34%] overflow-hidden rounded-3xl border border-white/10 bg-white/5 hover:border-white/30 transition"
            >
              <img src={img.src} alt={img.alt} className="h-[360px] w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => slide("prev")}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-xs text-white/85 hover:bg-black/80"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => slide("next")}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-xs text-white/85 hover:bg-black/80"
        >
          Next
        </button>
      </div>

      {open && active && activeIndex !== null && (
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
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-xl border border-white/15 px-3 py-1 text-xs text-white/80 hover:bg-white/5"
                  onClick={() => moveActive("prev")}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-white/15 px-3 py-1 text-xs text-white/80 hover:bg-white/5"
                  onClick={() => moveActive("next")}
                >
                  Next
                </button>
              </div>
              <button
                type="button"
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
