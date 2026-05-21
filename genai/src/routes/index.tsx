import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CodeBlock } from "@/components/site/CodeBlock";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight, Sparkles, Shield, Zap, Package, EyeOff, Lock, MessagesSquare,
  ScrollText, Smartphone, Check, Terminal,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgeSignal — Age Compliance SDK for Expo Apps" },
      { name: "description", content: "AgeSignal helps Expo and React Native developers add age-aware onboarding, minor-safe defaults, and app-store age signal handling without building compliance plumbing from scratch." },
      { property: "og:title", content: "AgeSignal — Age Compliance SDK for Expo Apps" },
      { property: "og:description", content: "Age-aware app behavior for Expo. Minor-safe defaults in minutes." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const heroCode = `const signal = await AgeSignal.getAgeSignal()

if (signal.isMinor) {
  disablePersonalizedAds()
  enablePrivateDefaults()
  hideUnsafeFeatures()
}`;

const installCode = `npx expo install @agesignal/expo`;

const askCode = `import { useAgeSignal } from "@agesignal/expo"

const { signal, request } = useAgeSignal()

await request({ reason: "personalize_safely" })`;

const behaviorCode = `if (signal?.isMinor) {
  setAdsMode("contextual")
  setDiscoveryMode("safe")
  hideFeature("dm")
}`;

const providerCode = `import { AgeSignalProvider, useAgeSignal } from "@agesignal/expo"

function App() {
  return (
    <AgeSignalProvider>
      <Home />
    </AgeSignalProvider>
  )
}`;

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="size-3 text-primary" />
                Built for Expo & React Native
              </div>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
                Age compliance SDK for{" "}
                <span className="text-gradient">Expo apps</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed">
                Add age-aware onboarding, minor-safe defaults, and app-store age signal handling to your React Native app — without building compliance plumbing from scratch.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" id="waitlist">
                <WaitlistForm />
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Check className="size-3.5 text-primary" /> Self-serve</span>
                <span className="flex items-center gap-1.5"><Check className="size-3.5 text-primary" /> Expo-first</span>
                <span className="flex items-center gap-1.5"><Check className="size-3.5 text-primary" /> No enterprise sales</span>
              </div>
              <div className="mt-6">
                <a href="#sdk-preview">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    See SDK example <ArrowRight className="ml-1 size-4" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:pl-6">
              <CodeBlock filename="App.tsx" code={heroCode} />
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-wider text-primary">The problem</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Age rules are coming to consumer apps
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
            California and other states are pushing apps toward age-aware experiences. Small teams now need practical app behavior changes: safer defaults, age gates, privacy choices, and auditability.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="text-xs font-mono uppercase tracking-wider text-primary">Why AgeSignal</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Built for the way you ship</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            { icon: Package, title: "Expo-first SDK", body: "Drop-in for managed Expo. Works in bare React Native too. Typed, tiny, and predictable." },
            { icon: Shield, title: "Minor-safe defaults", body: "One signal, sensible defaults. Disable personalized ads, lock down discovery, hide unsafe features." },
            { icon: Zap, title: "Self-serve setup", body: "Install, wrap your app, ship. No sales calls, no MSA, no enterprise onboarding." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card/60 p-6 hover:border-primary/40 transition">
              <div className="grid size-10 place-items-center rounded-lg bg-gradient-brand shadow-glow">
                <f.icon className="size-5 text-primary-foreground" />
              </div>
              <div className="mt-4 font-semibold">{f.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="text-xs font-mono uppercase tracking-wider text-primary">How it works</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Three steps to age-aware</h2>

        <div className="mt-12 grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            {[
              { n: "01", title: "Install the SDK", body: "Add the package to your Expo or bare RN project." },
              { n: "02", title: "Ask for an age signal", body: "Request a signal from the OS, app store, or your onboarding flow." },
              { n: "03", title: "Change app behavior safely", body: "Branch on signal.isMinor and apply minor-safe defaults." },
            ].map((s) => (
              <div key={s.n} className="flex gap-5">
                <div className="font-mono text-sm text-primary pt-1">{s.n}</div>
                <div>
                  <div className="font-semibold">{s.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <CodeBlock filename="1. install" language="bash" code={installCode} />
            <CodeBlock filename="2. request signal" code={askCode} />
            <CodeBlock filename="3. branch behavior" code={behaviorCode} />
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="text-xs font-mono uppercase tracking-wider text-primary">Use cases</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">What you can build</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: EyeOff, t: "Disable personalized ads for minors", d: "Switch to contextual ads automatically." },
            { icon: Shield, t: "Hide adult or unsafe features", d: "Gate adult content based on the signal." },
            { icon: Lock, t: "Turn on private defaults", d: "Private profile, restricted DMs, opt-out analytics." },
            { icon: MessagesSquare, t: "Gate chat, discovery, or sharing", d: "Limit risky social surfaces for minors." },
            { icon: ScrollText, t: "Log age-related decisions", d: "Local, auditable trail of what you applied and why." },
            { icon: Smartphone, t: "Prepare for app-store age signals", d: "Wire into emerging iOS & Android APIs as they land." },
          ].map((u) => (
            <div key={u.t} className="rounded-xl border border-border bg-card/40 p-5 hover:bg-card/70 transition">
              <u.icon className="size-5 text-primary" />
              <div className="mt-3 font-medium">{u.t}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{u.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SDK preview */}
      <section id="sdk-preview" className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-primary">SDK preview</div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Feels like a Stripe SDK, fits in an Expo app</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A single provider, a single hook, and a typed signal. No native module gymnastics, no config matrix.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/docs"><Button variant="outline">Read the docs</Button></Link>
              <a href="#waitlist">
                <Button className="bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-glow">
                  <Terminal className="mr-2 size-4" /> Join waitlist
                </Button>
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <CodeBlock filename="terminal" language="bash" code={"npm install @agesignal/expo"} />
            <CodeBlock filename="App.tsx" code={providerCode} />
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-primary">Pricing</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Simple, builder-friendly pricing</h2>
          <p className="mt-3 text-muted-foreground">All plans launch with the SDK. Join the waitlist for early pricing.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { name: "Starter", price: "$19", for: "For solo Expo apps" },
            { name: "Pro", price: "$49", for: "For growing consumer apps", featured: true },
            { name: "Team", price: "$99", for: "For small teams with multiple apps" },
          ].map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-7 bg-card/50 ${p.featured ? "border-primary/60 shadow-glow" : "border-border"}`}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.name}</div>
                <span className="text-[10px] uppercase tracking-wider rounded-full border border-border px-2 py-0.5 text-muted-foreground">Coming soon</span>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold">{p.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.for}</p>
              <Button disabled className="mt-6 w-full opacity-60">Coming soon</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <div className="rounded-xl border border-border bg-card/40 p-5 text-sm text-muted-foreground flex gap-3">
          <Shield className="size-4 mt-0.5 text-primary shrink-0" />
          <p>
            <span className="text-foreground font-medium">AgeSignal is developer infrastructure, not legal advice.</span>{" "}
            You are responsible for reviewing your obligations with counsel.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
        <div className="text-xs font-mono uppercase tracking-wider text-primary">FAQ</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Questions, answered honestly</h2>
        <Accordion type="single" collapsible className="mt-8">
          {[
            { q: "Is this age verification?", a: "No. AgeSignal is an age-aware behavior SDK. It surfaces a signal (e.g. likely-minor / likely-adult) from sources you choose — onboarding, OS APIs, or app-store age signals — and lets your app adapt. Hard identity verification is a different problem with different vendors." },
            { q: "Does this replace a lawyer?", a: "No. AgeSignal is developer infrastructure. It helps you implement minor-safe defaults and audit logs, but reviewing your legal obligations is on you and your counsel." },
            { q: "Does this work with Expo?", a: "Yes — Expo is the primary target. Drop in @agesignal/expo, wrap your app, and you're done. No custom dev client required for the JS layer." },
            { q: "Does this support bare React Native?", a: "Yes. The core works in bare RN. Native age-signal APIs are surfaced where available on each platform." },
            { q: "Will this handle California age-signal rules?", a: "AgeSignal is being built with California-style age-signal expectations in mind, plus emerging app-store signals on iOS and Android. We can't guarantee any specific legal outcome — that depends on your app and counsel." },
            { q: "Can I use it before the law takes effect?", a: "Yes. Most teams adopt minor-safe defaults early so you're not scrambling at the deadline. Join the waitlist to get in on the first cohort." },
          ].map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-20">
        <div className="rounded-3xl border border-border bg-card/60 p-10 text-center shadow-glow">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Ship age-aware behavior before the deadline
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Join the waitlist and get early access plus founder pricing.
          </p>
          <div className="mt-6 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
