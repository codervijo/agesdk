import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-gradient-brand shadow-glow">
            <Shield className="size-4 text-primary-foreground" />
          </span>
          <span>AgeSignal</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <Link to="/docs" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Docs</Link>
          <Link to="/checklist" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Checklist</Link>
          <Link to="/pricing" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Pricing</Link>
          <a href="/#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="/#waitlist">
            <Button size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-glow">
              Join waitlist
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
