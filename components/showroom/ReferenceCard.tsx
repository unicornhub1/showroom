import { ExternalLink } from "lucide-react";
import type { Reference } from "@/lib/db";
import { BRANCH_LABELS, TYPE_LABELS } from "@/lib/templates";

interface ReferenceCardProps {
  reference: Reference;
}

export function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <a
      href={reference.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-[#E2E5EF] bg-white shadow-[0_1px_3px_rgba(2,11,96,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(45,97,240,0.3)] hover:shadow-[0_8px_30px_rgba(45,97,240,0.1)]"
    >
      {/* Compact thumbnail area */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #E2E5EF, #F8F9FC)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ExternalLink className="h-8 w-8" style={{ color: "rgba(45, 97, 240, 0.25)" }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4">
        {/* Badges */}
        <div className="mb-2 flex flex-wrap gap-1.5">
          <span
            className="rounded-full px-2 py-0.5 text-[11px] font-medium"
            style={{
              background: "rgba(45, 97, 240, 0.08)",
              color: "#2D61F0",
            }}
          >
            {BRANCH_LABELS[reference.branch] || reference.branch}
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[11px] font-medium"
            style={{
              background: "rgba(107, 114, 148, 0.08)",
              color: "#6B7294",
            }}
          >
            {TYPE_LABELS[reference.type] || reference.type}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-sm font-semibold transition-colors duration-300"
          style={{ color: "#020B60" }}
        >
          <span className="group-hover:text-[#2D61F0] transition-colors duration-300">
            {reference.title}
          </span>
        </h3>

        {/* CTA */}
        <div
          className="mt-3 flex items-center gap-1.5 text-xs font-medium transition-all group-hover:gap-2"
          style={{ color: "#2D61F0" }}
        >
          <span>Referenz ansehen</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </a>
  );
}
