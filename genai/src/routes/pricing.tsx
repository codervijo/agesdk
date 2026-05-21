import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — AgeSignal SDK for Expo" },
      { name: "description", content: "Simple, builder-friendly pricing for the AgeSignal Expo SDK. Starter, Pro, and Team plans. Join the waitlist for founder pricing." },
      { property: "og:title", content: "AgeSignal Pricing" },
      { property: "og:description", content: "Simple, builder-friendly pricing for the AgeSignal Expo SDK." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Starter",
    price: "$19",
    for: "For solo Expo apps",
    features: ["1 app", "Core SDK", "Minor-safe defaults", "Community support"],
  },
  {
    name: "Pro",
    price: "$49",
    for: "For growing consumer apps",
    featured: true,
    features: ["3 apps", "Audit log export", "Priority email support", "App-store age signal hooks"],
  },
  {
    name: "Team",
    price: "$99",
    for: "For small teams with multiple apps",
    features: ["10 apps", "Team seats", "SSO when available", "Slack support channel"],
  },
];

function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-primary">Pricing</div>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">Built for builders, priced like one</h1>
          <p className="mt-4 text-muted-foreground">
            Launching with the SDK. Join the waitlist and lock in founder pricing.
          </p>
          <div className="mt-6 flex justify-center"><WaitlistForm compact /></div>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-7 bg-card/50 flex flex-col ${p.featured ? "border-primary/60 shadow-glow" : "border-border"}`}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg">{p.name}</div>
                <span className="text-[10px] uppercase tracking-wider rounded-full border border-border px-2 py-0.5 text-muted-foreground">Coming soon</span>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold">{p.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.for}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="size-4 text-primary mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button disabled className="mt-6 w-full opacity-60">Coming soon</Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          Need something custom? <Link to="/" className="text-primary hover:underline">Join the waitlist</Link> and mention your use case.
        </div>
      </main>
      <Footer />
    </div>
  );
}
