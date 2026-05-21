import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid size-6 place-items-center rounded-md bg-gradient-brand">
              <Shield className="size-3.5 text-primary-foreground" />
            </span>
            AgeSignal
          </div>
          <p className="mt-3 text-muted-foreground max-w-sm">
            Age-aware app behavior for Expo. Developer infrastructure, not legal advice.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">agesdk.dev</p>
        </div>
        <div>
          <div className="font-medium mb-3">Product</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/docs" className="hover:text-foreground">Docs</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/checklist" className="hover:text-foreground">Checklist</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3">Legal</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>Developer infrastructure</li>
            <li>Not legal advice</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AgeSignal. Built for Expo & React Native developers.
      </div>
    </footer>
  );
}
