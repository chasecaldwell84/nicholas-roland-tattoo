"use client";

import { useEffect, useMemo, useState } from "react";
import ReferenceUploader from "@/components/ReferenceUploader";
import { defaultSiteContent, normalizeSiteContent, type SiteContent } from "@/lib/site-content";

type PortfolioImage = {
  src: string;
  alt: string;
};

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) return error.message;
  return fallback;
}

export default function ArtistPage() {
  const [adminToken, setAdminToken] = useState("");
  const [altText, setAltText] = useState("");
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [contentJson, setContentJson] = useState<string>(JSON.stringify(defaultSiteContent, null, 2));

  async function loadImages() {
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to load portfolio.");
    setImages(data.images || []);
  }

  async function loadSiteContent() {
    const res = await fetch("/api/site-content", { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to load site content.");
    const normalized = normalizeSiteContent(data.content);
    setSiteContent(normalized);
    setContentJson(JSON.stringify(normalized, null, 2));
  }

  useEffect(() => {
    Promise.all([loadImages(), loadSiteContent()]).catch((error: unknown) => {
      setStatus({ type: "err", msg: errorMessage(error, "Failed to load images.") });
    });
  }, []);

  const authHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      ...(adminToken.trim() ? { Authorization: `Bearer ${adminToken.trim()}` } : {}),
    }),
    [adminToken]
  );

  async function saveUploaded(urls: string[]) {
    if (urls.length === 0) return;
    setStatus(null);

    const prepared = urls.map((src, index) => ({
      src,
      alt: altText.trim() || `Tattoo Piece ${images.length + index + 1}`,
    }));

    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ images: prepared }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save uploaded image.");
      setImages(data.images || []);
      setStatus({ type: "ok", msg: "Portfolio updated." });
      setAltText("");
    } catch (error: unknown) {
      setStatus({ type: "err", msg: errorMessage(error, "Could not save image.") });
    } finally {
      setSaving(false);
    }
  }

  async function removeImage(src: string) {
    setStatus(null);
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "DELETE",
        headers: authHeaders,
        body: JSON.stringify({ src }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to remove image.");
      setImages(data.images || []);
      setStatus({ type: "ok", msg: "Image removed." });
    } catch (error: unknown) {
      setStatus({ type: "err", msg: errorMessage(error, "Could not remove image.") });
    } finally {
      setSaving(false);
    }
  }

  async function saveSiteContent() {
    setStatus(null);
    setSaving(true);
    try {
      const parsed = JSON.parse(contentJson) as unknown;
      const res = await fetch("/api/site-content", {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({ content: parsed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save website text.");
      const normalized = normalizeSiteContent(data.content);
      setSiteContent(normalized);
      setContentJson(JSON.stringify(normalized, null, 2));
      setStatus({ type: "ok", msg: "Website text updated." });
    } catch (error: unknown) {
      setStatus({ type: "err", msg: errorMessage(error, "Could not save website text.") });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-14 text-white">
      <h1 className="text-3xl font-semibold">Artist Portfolio Manager</h1>
      <p className="mt-3 text-sm text-white/70">
        Upload and manage portfolio images without editing code. Use your artist admin token to save changes.
      </p>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <label className="text-sm text-white/80">Artist Admin Token</label>
        <input
          type="password"
          value={adminToken}
          onChange={(e) => setAdminToken(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-white/30"
          placeholder="Enter ARTIST_ADMIN_TOKEN"
        />

        <label className="mt-4 block text-sm text-white/80">Default Caption (optional)</label>
        <input
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-white/30"
          placeholder="Example: Fine line floral forearm piece"
        />

        <div className="mt-4">
          <ReferenceUploader onUploaded={saveUploaded} />
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold">Website Text Editor</h2>
        <p className="mt-2 text-xs text-white/60">
          Edit website copy as JSON. Keep the same keys, change only the values.
        </p>
        <textarea
          value={contentJson}
          onChange={(e) => setContentJson(e.target.value)}
          className="mt-4 min-h-[420px] w-full rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs outline-none focus:border-white/30"
          spellCheck={false}
        />
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={saveSiteContent}
            disabled={saving}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
          >
            Save Website Text
          </button>
          <button
            type="button"
            onClick={() => setContentJson(JSON.stringify(siteContent, null, 2))}
            disabled={saving}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/85 hover:bg-white/5 disabled:opacity-50"
          >
            Reset Unsaved Changes
          </button>
        </div>
      </section>

      {status && (
        <div
          className={[
            "mt-4 rounded-xl px-4 py-3 text-sm",
            status.type === "ok"
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : "border border-red-500/30 bg-red-500/10 text-red-200",
          ].join(" ")}
        >
          {status.msg}
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Current Portfolio</h2>
        {images.length === 0 ? (
          <p className="mt-3 text-sm text-white/60">No images yet.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <div key={img.src} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-48 w-full rounded-xl object-cover"
                />
                <p className="mt-2 text-xs text-white/70">{img.alt}</p>
                <button
                  type="button"
                  onClick={() => removeImage(img.src)}
                  disabled={saving}
                  className="mt-3 rounded-lg border border-red-400/30 px-3 py-1.5 text-xs text-red-200 hover:bg-red-500/10 disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
