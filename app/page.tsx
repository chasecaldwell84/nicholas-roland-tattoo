"use client";


import React from "react";


export default function Page() {
return (
<main className="min-h-screen bg-black text-white">
{/* HERO */}
<section className="mx-auto max-w-6xl px-6 py-24">
<h1 className="text-4xl md:text-5xl font-semibold">Nicholas M. Roland</h1>
<p className="mt-2 text-white/70">@nicholasmroland</p>
<p className="mt-6 text-white/80 max-w-xl">
North Dallas tattoo artist specializing in clean black and grey, fine line, and engraving style tattoos.
</p>
</section>


{/* WHAT TO EXPECT */}
<section className="mx-auto max-w-6xl px-6 py-16">
<h2 className="text-2xl font-semibold">What to Expect</h2>


<div className="mt-6 grid gap-4 md:grid-cols-3">
<InfoCard title="Deposits">
Deposits secure your appointment and go toward the final price. Deposits are non-refundable.
</InfoCard>


<InfoCard title="Rules">
Be on time. Stay hydrated. Don't show up sunburned. If you're sick, reschedule.
</InfoCard>


<InfoCard title="Aftercare">
You'll receive detailed aftercare instructions after your session. Follow them to heal clean.
</InfoCard>
</div>
</section>


{/* GUIDELINES */}
<section className="mx-auto max-w-6xl px-6 py-16">
<div className="rounded-3xl border border-white/10 bg-white/5 p-6">
<h2 className="text-2xl font-semibold">Studio Guidelines</h2>


<ul className="mt-4 space-y-2 text-sm text-white/70">
<li>• 18+ only (valid ID required)</li>
<li>• Deposits required to book</li>
<li>• Respect the artist's time</li>
<li>• Follow prep and aftercare instructions</li>
</ul>


<div className="mt-6 text-xs text-white/50">
© {new Date().getFullYear()} Nicholas M. Roland
</div>
</div>
</section>
</main>
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
