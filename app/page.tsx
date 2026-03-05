"use client";

import React, { useEffect, useMemo, useState } from "react";
import Gallery from "@/components/Gallery";

type PortfolioImage = { src: string; alt: string };

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) return error.message;
  return fallback;
}

export default function Page() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    instagram: "",
    placement: "",
    size: 8,
    style: "Fine line",
    color: "Black & Grey",
    description: "",
    additionalInfo: "",
  });

  const sizeLabel = useMemo(() => `${form.size}"`, [form.size]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    fetch("/api/portfolio", { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load portfolio.");
        setPortfolioImages(data.images || []);
      })
      .catch(() => {
        setPortfolioImages([]);
      });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!form.fullName.trim()) return setStatus({ type: "err", msg: "Please enter your name." });
    if (!form.email.trim()) return setStatus({ type: "err", msg: "Please enter your email." });
    if (!form.placement.trim()) return setStatus({ type: "err", msg: "Please tell us placement." });
    if (!form.description.trim()) return setStatus({ type: "err", msg: "Please describe what you want." });

    setSubmitting(true);
    try {
      const res = await fetch("/api/tattoo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit.");

      setStatus({ type: "ok", msg: "Submitted! You’ll receive an email confirmation shortly." });
      setForm({
        fullName: "",
        email: "",
        phone: "",
        instagram: "",
        placement: "",
        size: 8,
        style: "Fine line",
        color: "Black & Grey",
        description: "",
        additionalInfo: "",
      });
    } catch (error: unknown) {
      setStatus({ type: "err", msg: errorMessage(error, "Something went wrong.") });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.25em] text-white/60">NORTH DALLAS TATTOO ARTIST</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Nicholas M. Roland
            </h1>
            <p className="mt-3 text-white/70">@nicholasmroland</p>

            <p className="mt-6 text-white/80 md:text-lg">
              Clean, bold work with details that age well. Browse the portfolio and submit a request to book.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("booking")}
                className="rounded-2xl bg-white px-5 py-3 text-black font-semibold shadow hover:opacity-90 transition"
              >
                Request a Tattoo
              </button>
              <button
                onClick={() => scrollTo("portfolio")}
                className="rounded-2xl border border-white/15 px-5 py-3 text-white/85 hover:bg-white/5 transition"
              >
                View Portfolio
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-2 text-xs text-white/60">
              <span className="rounded-full border border-white/15 px-3 py-1">Fine line</span>
              <span className="rounded-full border border-white/15 px-3 py-1">Black & Grey</span>
              <span className="rounded-full border border-white/15 px-3 py-1">Engraving / Wood carving</span>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-semibold">Tattoo Request</h2>
            <p className="mt-3 text-white/70">
              Fill this out and you’ll get an email confirmation that your request is under review.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/70">
                Response time: <span className="text-white">24–72 hours</span>
              </p>
              <p className="mt-2 text-sm text-white/70">
                If it’s a fit, you’ll receive next steps for scheduling and deposit.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
            {status && (
              <div
                className={[
                  "mb-5 rounded-2xl px-4 py-3 text-sm",
                  status.type === "ok"
                    ? "bg-white text-black"
                    : "bg-red-500/15 text-red-200 border border-red-500/30",
                ].join(" ")}
              >
                {status.msg}
              </div>
            )}

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    placeholder="Your name"
                  />
                </Field>

                <Field label="Email" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    placeholder="you@email.com"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone (optional)">
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    placeholder="(xxx) xxx-xxxx"
                  />
                </Field>

                <Field label="Instagram (optional)">
                  <input
                    value={form.instagram}
                    onChange={(e) => setForm((p) => ({ ...p, instagram: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    placeholder="@yourhandle"
                  />
                </Field>
              </div>

              <Field
                label="Placement"
                required
                hint='Examples: “outer forearm”, “left ribs”, “upper back”, “behind ear” (open-ended)'
              >
                <input
                  value={form.placement}
                  onChange={(e) => setForm((p) => ({ ...p, placement: e.target.value }))}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  placeholder="Where on your body?"
                />
              </Field>

              <Field label={`Size (scale) — ${sizeLabel}`} required hint='Slide up to 24" max.'>
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={form.size}
                  onChange={(e) => setForm((p) => ({ ...p, size: Number(e.target.value) }))}
                  className="w-full accent-white"
                />
                <div className="mt-2 flex justify-between text-xs text-white/60">
                  <span>1&quot;</span>
                  <span>24&quot;</span>
                </div>
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Style" required>
                  <select
                    value={form.style}
                    onChange={(e) => setForm((p) => ({ ...p, style: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  >
                    <option>Fine line</option>
                    <option>Blackwork</option>
                    <option>Traditional</option>
                    <option>Neo-traditional</option>
                    <option>Realism</option>
                    <option>Japanese</option>
                    <option>Engraving / Wood carving</option>
                    <option>Other</option>
                  </select>
                </Field>

                <Field label="Color" required>
                  <select
                    value={form.color}
                    onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  >
                    <option>Black & Grey</option>
                    <option>Color</option>
                    <option>Either</option>
                  </select>
                </Field>
              </div>

              <Field label="Describe your idea" required>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="min-h-[120px] w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  placeholder="Subject, vibe, details, inspiration, etc."
                />
              </Field>

              <Field label="Additional information" hint="Optional. Anything else you want me to know.">
                <textarea
                  value={form.additionalInfo}
                  onChange={(e) => setForm((p) => ({ ...p, additionalInfo: e.target.value }))}
                  className="min-h-[90px] w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  placeholder="Cover-up info, timing, context, etc."
                />
              </Field>

              <button
                disabled={submitting}
                className="mt-2 rounded-2xl bg-white px-5 py-3 text-black font-semibold shadow hover:opacity-90 disabled:opacity-60 transition"
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>

              <p className="text-xs text-white/50">
                You’ll receive a confirmation email that your request is under review.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Portfolio</h2>
            <p className="mt-2 text-white/70">A few recent pieces. Tap to enlarge.</p>
          </div>
          <div className="text-sm text-white/60">@nicholasmroland</div>
        </div>

        <div className="mt-6">
          {portfolioImages.length > 0 ? (
            <Gallery images={portfolioImages} />
          ) : (
            <p className="text-sm text-white/60">Portfolio images are being updated. Please check back soon.</p>
          )}
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-2xl font-semibold">What to Expect</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoCard title="Deposits">
            Deposits secure your appointment and go toward the final price. Deposits are non-refundable.
          </InfoCard>
          <InfoCard title="Rules">
            Be on time. Stay hydrated. Don’t show up sunburned. If you’re sick, reschedule.
          </InfoCard>
          <InfoCard title="Aftercare">
            You’ll get detailed aftercare instructions after your session—follow them to heal clean.
          </InfoCard>
        </div>
      </section>

      {/* GUIDELINES */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Studio Guidelines</h2>

          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>• 18+ only (valid ID required).</li>
            <li>• Deposits required to book.</li>
            <li>• Respect the artist’s time (late arrivals may be cancelled).</li>
            <li>• You’ll receive prep + aftercare instructions before/after your appointment.</li>
          </ul>

          <div className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} Nicholas M. Roland.</div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label className="text-sm font-medium">
          {label} {required && <span className="text-white/60">*</span>}
        </label>
      </div>
      {children}
      {hint && <p className="mt-2 text-xs text-white/50">{hint}</p>}
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{children}</div>
    </div>
  );
}
