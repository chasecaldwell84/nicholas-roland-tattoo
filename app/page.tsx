"use client";

import React, { useEffect, useMemo, useState } from "react";
import Gallery from "@/components/Gallery";
import ReferenceUploader from "@/components/ReferenceUploader";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content";

type PortfolioImage = { src: string; alt: string };

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) return error.message;
  return fallback;
}

export default function Page() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [referencePhotoUrls, setReferencePhotoUrls] = useState<string[]>([]);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

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

  useEffect(() => {
    fetch("/api/site-content", { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load site content.");
        if (data.content) setContent(data.content);
      })
      .catch(() => {
        setContent(defaultSiteContent);
      });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!form.fullName.trim()) return setStatus({ type: "err", msg: content.form.validationName });
    if (!form.email.trim()) return setStatus({ type: "err", msg: content.form.validationEmail });
    if (!form.placement.trim()) return setStatus({ type: "err", msg: content.form.validationPlacement });
    if (!form.description.trim()) return setStatus({ type: "err", msg: content.form.validationDescription });

    setSubmitting(true);
    try {
      const res = await fetch("/api/tattoo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, referencePhotoUrls }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit.");

      setStatus({ type: "ok", msg: content.form.successMessage });
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
      setReferencePhotoUrls([]);
    } catch (error: unknown) {
      setStatus({ type: "err", msg: errorMessage(error, content.form.errorFallback) });
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
            backgroundImage: "url('/hero.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.25em] text-white/60">{content.hero.locationLabel}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              {content.hero.artistName}
            </h1>
            <p className="mt-3 text-white/70">{content.hero.instagramHandle}</p>

            <p className="mt-6 text-white/80 md:text-lg">
              {content.hero.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("booking")}
                className="rounded-2xl bg-white px-5 py-3 text-black font-semibold shadow hover:opacity-90 transition"
              >
                {content.hero.primaryCta}
              </button>
              <button
                onClick={() => scrollTo("portfolio")}
                className="rounded-2xl border border-white/15 px-5 py-3 text-white/85 hover:bg-white/5 transition"
              >
                {content.hero.secondaryCta}
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-2 text-xs text-white/60">
              {content.hero.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src="/hero.jpeg"
              alt={content.about.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{content.about.heading}</h2>
            <p className="mt-4 text-white/75">
              {content.about.bodyOne}
            </p>
            <p className="mt-4 text-white/70">{content.about.bodyTwo}</p>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-semibold">{content.booking.heading}</h2>
            <p className="mt-3 text-white/70">{content.booking.intro}</p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/70">
                {content.booking.responseLabel} <span className="text-white">{content.booking.responseTime}</span>
              </p>
              <p className="mt-2 text-sm text-white/70">{content.booking.fitNote}</p>
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
                <Field label={content.form.fullNameLabel} required>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    placeholder={content.form.fullNamePlaceholder}
                  />
                </Field>

                <Field label={content.form.emailLabel} required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    placeholder={content.form.emailPlaceholder}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={content.form.phoneLabel}>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    placeholder={content.form.phonePlaceholder}
                  />
                </Field>

                <Field label={content.form.instagramLabel}>
                  <input
                    value={form.instagram}
                    onChange={(e) => setForm((p) => ({ ...p, instagram: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    placeholder={content.form.instagramPlaceholder}
                  />
                </Field>
              </div>

              <Field
                label={content.form.placementLabel}
                required
                hint={content.form.placementHint}
              >
                <input
                  value={form.placement}
                  onChange={(e) => setForm((p) => ({ ...p, placement: e.target.value }))}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  placeholder={content.form.placementPlaceholder}
                />
              </Field>

              <Field label={`${content.form.sizeLabel} — ${sizeLabel}`} required hint={content.form.sizeHint}>
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={form.size}
                  onChange={(e) => setForm((p) => ({ ...p, size: Number(e.target.value) }))}
                  className="w-full accent-white"
                />
                <div className="mt-2 flex justify-between text-xs text-white/60">
                  <span>{content.form.sizeMinLabel}</span>
                  <span>{content.form.sizeMaxLabel}</span>
                </div>
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={content.form.styleLabel} required>
                  <select
                    value={form.style}
                    onChange={(e) => setForm((p) => ({ ...p, style: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  >
                    {content.form.styleOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>

                <Field label={content.form.colorLabel} required>
                  <select
                    value={form.color}
                    onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
                    className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  >
                    {content.form.colorOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label={content.form.ideaLabel} required>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="min-h-[120px] w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  placeholder={content.form.ideaPlaceholder}
                />
              </Field>

              <Field label={content.form.additionalInfoLabel} hint={content.form.additionalInfoHint}>
                <textarea
                  value={form.additionalInfo}
                  onChange={(e) => setForm((p) => ({ ...p, additionalInfo: e.target.value }))}
                  className="min-h-[90px] w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                  placeholder={content.form.additionalInfoPlaceholder}
                />
              </Field>

              <Field label={content.form.referencesLabel} hint={content.form.referencesHint}>
                <ReferenceUploader onUploaded={setReferencePhotoUrls} />
                <p className="mt-2 text-xs text-white/60">
                  {referencePhotoUrls.length > 0
                    ? `${referencePhotoUrls.length} ${
                        referencePhotoUrls.length === 1
                          ? content.form.referencesAttachedSingular
                          : content.form.referencesAttachedPlural
                      }`
                    : content.form.referencesNoneText}
                </p>
              </Field>

              <button
                disabled={submitting}
                className="mt-2 rounded-2xl bg-white px-5 py-3 text-black font-semibold shadow hover:opacity-90 disabled:opacity-60 transition"
              >
                {submitting ? content.form.submittingText : content.form.submitText}
              </button>

              <p className="text-xs text-white/50">{content.form.confirmationText}</p>
            </div>
          </form>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">{content.portfolio.heading}</h2>
            <p className="mt-2 text-white/70">{content.portfolio.subtitle}</p>
          </div>
          <div className="text-sm text-white/60">{content.portfolio.handle}</div>
        </div>

        <div className="mt-6">
          {portfolioImages.length > 0 ? (
            <Gallery images={portfolioImages} />
          ) : (
            <p className="text-sm text-white/60">{content.portfolio.emptyMessage}</p>
          )}
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-2xl font-semibold">{content.whatToExpect.heading}</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoCard title={content.whatToExpect.depositsTitle}>{content.whatToExpect.depositsBody}</InfoCard>
          <InfoCard title={content.whatToExpect.rulesTitle}>{content.whatToExpect.rulesBody}</InfoCard>
          <InfoCard title={content.whatToExpect.aftercareTitle}>{content.whatToExpect.aftercareBody}</InfoCard>
        </div>
      </section>

      {/* GUIDELINES */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold">{content.guidelines.heading}</h2>

          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {content.guidelines.items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>

          <div className="mt-6 text-xs text-white/50">
            {content.guidelines.footerTemplate.replace("{year}", String(new Date().getFullYear()))}
          </div>
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
