"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type Section = {
  label: string;
  value: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  sections: Section[];
};

export function EntityDetailModal({
  open,
  onOpenChange,
  title,
  description,
  sections,
}: Props) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div
        className="
          relative z-10
          w-[95vw] max-w-3xl
          max-h-[90vh]
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-gradient-to-b from-gray-900 via-gray-950 to-black
          shadow-2xl
          animate-in fade-in zoom-in-95
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-white/60">{description}</p>
            )}
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-96px)] overflow-y-auto p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((section) => {
              const isCrawl = section.label.toLowerCase().includes("crawl");

              return (
                <div
                  key={section.label}
                  className="rounded-xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-xs tracking-widest text-yellow-300/80">
                    {section.label}
                  </p>

                  {isCrawl ? (
                    <div className="mt-2 max-h-60 overflow-y-auto whitespace-pre-line pr-2 text-sm leading-relaxed text-white/90">
                      {section.value}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm font-medium text-white">
                      {section.value}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
