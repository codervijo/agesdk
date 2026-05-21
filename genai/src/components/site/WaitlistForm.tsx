import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2 } from "lucide-react";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setTimeout(() => setState("done"), 700);
  };

  if (state === "done") {
    return (
      <div className={`flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-3 text-sm ${compact ? "" : "max-w-md"}`}>
        <Check className="size-4 text-primary" />
        You're on the list. We'll email <span className="font-mono text-foreground">{email}</span> when the SDK is ready.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex flex-col sm:flex-row gap-2 ${compact ? "" : "max-w-md"}`}>
      <Input
        type="email"
        required
        placeholder="you@yourapp.dev"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-card/60 border-border h-11"
      />
      <Button
        type="submit"
        disabled={state === "loading"}
        className="h-11 bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-glow"
      >
        {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : "Join waitlist"}
      </Button>
    </form>
  );
}
