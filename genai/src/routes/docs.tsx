import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Button } from "@/components/ui/button";
import { Book, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — AgeSignal SDK for Expo" },
      { name: "description", content: "Install, configure, and request an age signal in your Expo or React Native app with the AgeSignal SDK." },
      { property: "og:title", content: "AgeSignal Docs — Expo & React Native SDK" },
      { property: "og:description", content: "Quickstart guide for the AgeSignal Expo SDK." },
      { property: "og:url", content: "/docs" },
    ],
    links: [{ rel: "canonical", href: "/docs" }],
  }),
  component: DocsPage,
});

const install = `npx expo install @agesignal/expo`;
const provider = `// App.tsx
import { AgeSignalProvider } from "@agesignal/expo"

export default function App() {
  return (
    <AgeSignalProvider apiKey={process.env.EXPO_PUBLIC_AGESIGNAL_KEY}>
      <RootNavigator />
    </AgeSignalProvider>
  )
}`;
const useHook = `import { useAgeSignal } from "@agesignal/expo"

function Onboarding() {
  const { signal, request, loading } = useAgeSignal()

  if (!signal) {
    return <Button onPress={request}>Continue</Button>
  }

  return signal.isMinor ? <MinorHome /> : <AdultHome />
}`;
const branching = `if (signal.isMinor) {
  setAdsMode("contextual")
  setDiscoveryMode("safe")
  hideFeature("dm")
  enablePrivateDefaults()
}`;
const audit = `await AgeSignal.log({
  decision: "disabled_personalized_ads",
  reason: "signal.isMinor === true",
})`;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16 grid lg:grid-cols-[220px_1fr] gap-12 flex-1">
        <aside className="hidden lg:block">
          <div className="sticky top-20 text-sm">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
              <Book className="size-3.5" /> Docs
            </div>
            <ul className="space-y-2">
              {[
                ["install", "Install"],
                ["provider", "Provider"],
                ["request", "Request signal"],
                ["behavior", "Adapt behavior"],
                ["audit", "Audit log"],
                ["platforms", "Platforms"],
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-muted-foreground hover:text-foreground transition">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="space-y-14 max-w-3xl">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-primary">v0 preview</div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">AgeSignal SDK</h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Add age-aware behavior to your Expo or React Native app in under five minutes.
            </p>
          </div>

          <Section id="install" title="Install">
            <p>Add the SDK to your Expo project.</p>
            <CodeBlock filename="terminal" language="bash" code={install} />
          </Section>

          <Section id="provider" title="Wrap your app in the provider">
            <p>The provider initializes the SDK and exposes the signal via hooks.</p>
            <CodeBlock filename="App.tsx" code={provider} />
          </Section>

          <Section id="request" title="Request an age signal">
            <p>
              Use <code className="text-foreground">useAgeSignal()</code> in any component. The signal can come from onboarding, the OS, or an app-store API.
            </p>
            <CodeBlock filename="Onboarding.tsx" code={useHook} />
          </Section>

          <Section id="behavior" title="Adapt app behavior">
            <p>Branch on the signal and apply minor-safe defaults — the whole point of the SDK.</p>
            <CodeBlock filename="behavior.ts" code={branching} />
          </Section>

          <Section id="audit" title="Audit log">
            <p>Log age-related decisions locally so you can show your work later.</p>
            <CodeBlock filename="audit.ts" code={audit} />
          </Section>

          <Section id="platforms" title="Platforms">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Expo SDK 50+ (managed and dev client)</li>
              <li>Bare React Native 0.73+</li>
              <li>iOS 16+ — wires into emerging Apple age-signal APIs</li>
              <li>Android 13+ — wires into Google age-signal APIs</li>
            </ul>
          </Section>

          <div className="rounded-2xl border border-border bg-card/60 p-6 flex items-center justify-between">
            <div>
              <div className="font-semibold">Ready to try AgeSignal?</div>
              <p className="text-sm text-muted-foreground">Join the waitlist for early access.</p>
            </div>
            <Link to="/"><Button className="bg-gradient-brand text-primary-foreground hover:opacity-90">Join waitlist <ArrowRight className="ml-1 size-4" /></Button></Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
