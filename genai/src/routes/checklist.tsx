import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { Check, Shield, Download, Loader2, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "California Age Compliance Checklist for Expo Apps — AgeSignal" },
      { name: "description", content: "A practical, developer-focused checklist for California age compliance in Expo and React Native apps. Free, no legal guarantees, written for builders." },
      { property: "og:title", content: "California Age Compliance Checklist for Expo Apps" },
      { property: "og:description", content: "Practical, developer-focused checklist for age-aware behavior in Expo apps." },
      { property: "og:url", content: "/checklist" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/checklist" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "California Age Compliance Checklist for Expo Apps",
        description: "Practical, developer-focused checklist for age-aware behavior in Expo and React Native apps.",
        author: { "@type": "Organization", name: "AgeSignal" },
      }),
    }],
  }),
  component: ChecklistPage,
});

const sections = [
  {
    title: "Onboarding",
    items: [
      "Ask for an age signal during onboarding, not after first use.",
      "Make the prompt clear and not buried under dark patterns.",
      "Don't store more than you need — a single age band is usually enough.",
      "Handle the 'declined to answer' case explicitly.",
    ],
  },
  {
    title: "Minor-safe defaults",
    items: [
      "Default likely-minor users to private profiles.",
      "Turn off personalized ads for likely-minor users.",
      "Restrict DMs from strangers by default.",
      "Hide adult, mature, or unsafe-by-default features.",
      "Use safe-by-default discovery feeds.",
    ],
  },
  {
    title: "Ads & analytics",
    items: [
      "Switch to contextual ads for minors.",
      "Disable behavioral retargeting for minors.",
      "Avoid sharing minor data with third-party SDKs you don't need.",
      "Review your analytics SDKs for age-aware modes.",
    ],
  },
  {
    title: "Auditability",
    items: [
      "Log every age-related decision (what changed, why, when).",
      "Keep logs locally and exportable — no third-party PII dump.",
      "Be able to answer: 'what defaults did this user get and why?'",
    ],
  },
  {
    title: "App-store signals",
    items: [
      "Wire into iOS age-signal APIs as they ship.",
      "Wire into Android age-signal APIs as they ship.",
      "Treat the OS signal as a hint, not absolute truth.",
    ],
  },
  {
    title: "Don't do",
    items: [
      "Don't claim 'legally compliant' in marketing without counsel.",
      "Don't collect ID documents unless you really need to.",
      "Don't gate everything behind a hard age check on first launch.",
      "Don't ignore the 'I prefer not to say' path.",
    ],
  },
];

const STORAGE_KEY = "agesignal:checklist:v1";

async function generatePdf() {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 56;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("California Age Compliance Checklist", margin, y);
  y += 22;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(110);
  doc.text("For Expo / React Native apps  •  AgeSignal — agesdk.dev", margin, y);
  y += 10;
  doc.setTextColor(160);
  doc.text("Developer guidance, not legal advice.", margin, y);
  y += 24;
  doc.setTextColor(20);

  sections.forEach((section) => {
    if (y > 720) { doc.addPage(); y = margin; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(section.title, margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    section.items.forEach((item) => {
      const lines = doc.splitTextToSize(item, maxWidth - 18);
      if (y + lines.length * 14 > 760) { doc.addPage(); y = margin; }
      doc.rect(margin, y - 9, 10, 10);
      doc.text(lines, margin + 18, y);
      y += lines.length * 14 + 4;
    });
    y += 10;
  });

  doc.save("california-age-compliance-checklist.pdf");
}

function ChecklistPage() {
  const allItems = useMemo(() => sections.flatMap((s) => s.items), []);
  const total = allItems.length;
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch {}
  }, [checked]);

  const completed = allItems.filter((i) => checked[i]).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const toggle = (item: string) =>
    setChecked((c) => ({ ...c, [item]: !c[item] }));

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setTimeout(async () => {
      await generatePdf();
      setState("done");
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <div className="text-xs font-mono uppercase tracking-wider text-primary">Free guide</div>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
          California Age Compliance Checklist for Expo Apps
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          A practical checklist for solo developers, Expo teams, and React Native CTOs who want to ship age-aware behavior fast. No legal guarantees — just the engineering moves teams actually make.
        </p>

        <div className="mt-8 rounded-xl border border-border bg-card/40 p-5 text-sm text-muted-foreground flex gap-3">
          <Shield className="size-4 mt-0.5 text-primary shrink-0" />
          <p>
            <span className="text-foreground font-medium">This is developer guidance, not legal advice.</span>{" "}
            Always review your obligations with counsel.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card/60 p-5 sticky top-4 z-10 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="font-semibold text-foreground">{completed}</span>
              <span className="text-muted-foreground"> / {total} complete</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">{pct}%</div>
          </div>
          <Progress value={pct} className="mt-3 h-2" />
        </div>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl font-semibold tracking-tight">{s.title}</h2>
              <ul className="mt-4 space-y-1">
                {s.items.map((i) => {
                  const isChecked = !!checked[i];
                  return (
                    <li key={i}>
                      <label className="flex gap-3 items-start cursor-pointer rounded-md p-2.5 -mx-2.5 hover:bg-card/60 transition-colors">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggle(i)}
                          className="mt-0.5"
                        />
                        <span className={isChecked ? "text-muted-foreground line-through" : "text-foreground/90"}>
                          {i}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <div id="download" className="mt-16 rounded-2xl border border-border bg-card/60 p-7 shadow-glow">
          <div className="font-semibold text-lg flex items-center gap-2">
            <Download className="size-5 text-primary" /> Get the PDF
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Drop your email and we'll send the full checklist + future updates. The PDF downloads immediately.
          </p>
          {state === "done" ? (
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-border bg-background/40 px-4 py-3 text-sm">
              <Check className="size-4 text-primary" />
              PDF downloaded. We'll keep <span className="font-mono text-foreground">{email}</span> in the loop.
            </div>
          ) : (
            <form onSubmit={handleDownload} className="mt-5 flex flex-col sm:flex-row gap-2 max-w-md">
              <div className="relative flex-1">
                <Mail className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  placeholder="you@yourapp.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/60 border-border h-11 pl-9"
                />
              </div>
              <Button
                type="submit"
                disabled={state === "loading"}
                className="h-11 bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-glow"
              >
                {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : (<><Download className="size-4" /> Download PDF</>)}
              </Button>
            </form>
          )}
          <div className="mt-6 border-t border-border pt-5">
            <div className="font-semibold text-sm">Want this as an SDK?</div>
            <p className="mt-1 text-sm text-muted-foreground">
              AgeSignal turns this checklist into one provider + one hook for Expo and React Native.
            </p>
            <div className="mt-4"><WaitlistForm /></div>
            <div className="mt-3 text-xs text-muted-foreground">
              See the <Link to="/docs" className="text-primary hover:underline">docs</Link> or{" "}
              <Link to="/pricing" className="text-primary hover:underline">pricing</Link>.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
