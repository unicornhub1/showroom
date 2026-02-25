"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Template } from "@/lib/templates";
import { BRANCH_LABELS, TYPE_LABELS } from "@/lib/templates";

/* ── Branded gradient thumbnails per template ─────────────────────────── */

const TEMPLATE_GRADIENTS: Record<string, { bg: string; accent: string; name: string; tagline: string }> = {
  'gastro/saveur': {
    bg: 'linear-gradient(135deg, #1A1412 0%, #231C18 40%, #3D2B1F 100%)',
    accent: '#C8956C',
    name: 'SAVEUR',
    tagline: 'Fine Dining',
  },
  'sport/peak': {
    bg: 'linear-gradient(135deg, #0D0D0D 0%, #161616 40%, #1C1C1C 100%)',
    accent: '#FF4500',
    name: 'PRSM',
    tagline: 'Athletics',
  },
  'hotel/haven': {
    bg: 'linear-gradient(135deg, #FAF8F5 0%, #E8DDD3 40%, #D4DACE 100%)',
    accent: '#B8965A',
    name: 'HAVEN',
    tagline: 'Boutique Hotel',
  },
  'immobilien/quartier': {
    bg: 'linear-gradient(135deg, #0A1628 0%, #132244 40%, #1A3066 100%)',
    accent: '#2563EB',
    name: 'QUARTIER',
    tagline: 'Immobilien',
  },
  'gesundheit/vita': {
    bg: 'linear-gradient(135deg, #ECFDF5 0%, #F0F7F4 40%, #F9FAFB 100%)',
    accent: '#0D9488',
    name: 'VITA',
    tagline: 'Gesundheit',
  },
  'handwerk/werkbank': {
    bg: 'linear-gradient(135deg, #3D2B1F 0%, #5A3D2B 40%, #6B4C38 100%)',
    accent: '#C45C3B',
    name: 'WERKBANK',
    tagline: 'Meisterbetrieb',
  },
  'fashion/palazzo': {
    bg: 'linear-gradient(135deg, #0A0A0A 0%, #1A1410 40%, #2A1F15 100%)',
    accent: '#C9A55C',
    name: 'PALAZZO',
    tagline: 'Italian Luxury',
  },
  'fashion/jardin': {
    bg: 'linear-gradient(135deg, #FAF7F2 0%, #EDE8DF 40%, #E0D8CC 100%)',
    accent: '#7A8B6F',
    name: 'JARDIN',
    tagline: 'Contemporary Fashion',
  },
};

const LIGHT_TEXT_SLUGS = new Set(['hotel/haven', 'gesundheit/vita', 'fashion/jardin']);

interface TemplateCardProps {
  template: Template;
  index?: number;
}

export function TemplateCard({ template, index = 0 }: TemplateCardProps) {
  const delay = Math.min(index * 0.08, 0.4);
  const branded = TEMPLATE_GRADIENTS[template.slug];

  return (
    <Link
      href={`/templates/${template.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#E2E5EF] bg-white shadow-[0_1px_3px_rgba(2,11,96,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(45,97,240,0.3)] hover:shadow-[0_12px_40px_-8px_rgba(45,97,240,0.15),0_0_0_1px_rgba(45,97,240,0.1)]"
      style={{
        animation: `fade-in-up 0.6s ease-out ${delay}s both`,
      }}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {template.thumbnail ? (
          <Image
            src={template.thumbnail}
            alt={`${template.name} Vorschau`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : branded ? (
          /* Branded gradient placeholder with template name */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: branded.bg }}
          >
            {/* Decorative grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `linear-gradient(${branded.accent}33 1px, transparent 1px), linear-gradient(90deg, ${branded.accent}33 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Decorative accent circle */}
            <div
              className="absolute top-6 right-6 h-16 w-16 rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, ${branded.accent} 0%, transparent 70%)`,
              }}
            />
            {/* Template branding */}
            <span
              className="relative text-3xl font-bold tracking-[0.15em]"
              style={{
                color: LIGHT_TEXT_SLUGS.has(template.slug) ? branded.accent : '#FFFFFF',
                textShadow: LIGHT_TEXT_SLUGS.has(template.slug) ? 'none' : '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              {branded.name}
            </span>
            <span
              className="relative mt-1 text-xs font-medium tracking-[0.3em] uppercase"
              style={{
                color: branded.accent,
              }}
            >
              {branded.tagline}
            </span>
            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${branded.accent}, transparent)`,
              }}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #E2E5EF, #F8F9FC)",
            }}
          />
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(180deg, transparent 40%, rgba(2, 11, 96, 0.6) 100%)",
          }}
        />

        {/* CTA button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{
              background: "#A6D30F",
              color: "#020B60",
              boxShadow: "0 4px 20px rgba(166, 211, 15, 0.4)",
            }}
          >
            <span>Eintauchen</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Badges */}
        <div className="mb-3 flex flex-wrap gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
            style={{
              background: "rgba(45, 97, 240, 0.08)",
              color: "#2D61F0",
            }}
          >
            {BRANCH_LABELS[template.branch] || template.branch}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
            style={{
              background: "rgba(107, 114, 148, 0.08)",
              color: "#6B7294",
            }}
          >
            {TYPE_LABELS[template.type] || template.type}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold transition-colors duration-300"
          style={{ color: "#020B60" }}
        >
          <span className="group-hover:text-[#2D61F0] transition-colors duration-300">
            {template.name}
          </span>
        </h3>

        {/* Description */}
        <p
          className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed"
          style={{ color: "#6B7294" }}
        >
          {template.description}
        </p>

        {/* CTA */}
        <div
          className="mt-4 flex items-center gap-1.5 text-sm font-medium transition-all duration-300 group-hover:gap-3"
          style={{ color: "#2D61F0" }}
        >
          <span className="text-[12px] tracking-[0.1em] uppercase">Ansehen</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
