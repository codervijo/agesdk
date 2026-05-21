import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className={`group rounded-xl border border-code-border bg-code-bg overflow-hidden text-sm shadow-2xl shadow-black/40 ${className ?? ""}`}>
      <div className="flex items-center justify-between border-b border-code-border px-4 py-2.5 bg-black/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/60" />
            <span className="size-2.5 rounded-full bg-yellow-500/60" />
            <span className="size-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="ml-3 text-xs text-muted-foreground font-mono">
            {filename ?? language}
          </span>
        </div>
        <button
          onClick={copy}
          className="text-muted-foreground hover:text-foreground transition opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto leading-relaxed text-foreground/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
