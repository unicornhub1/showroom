"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

interface FilterBarProps {
  branches: string[];
  types: string[];
  branchLabels: Record<string, string>;
  typeLabels: Record<string, string>;
}

export function FilterBar({
  branches,
  types,
  branchLabels,
  typeLabels,
}: FilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeBranch = searchParams.get("branch") || "";
  const activeType = searchParams.get("type") || "";

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  return (
    <div className="animate-fade-in-up-delay-3 mx-auto max-w-7xl px-6 pb-8">
      <div className="space-y-4">
        {/* Branch filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="mr-2 text-[10px] font-medium tracking-[0.2em] uppercase"
            style={{ color: "#6B7294" }}
          >
            Branche
          </span>
          <FilterChip
            label="Alle"
            active={activeBranch === ""}
            onClick={() => setFilter("branch", "")}
          />
          {branches.map((branch) => (
            <FilterChip
              key={branch}
              label={branchLabels[branch] || branch}
              active={activeBranch === branch}
              onClick={() =>
                setFilter("branch", activeBranch === branch ? "" : branch)
              }
            />
          ))}
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="mr-2 text-[10px] font-medium tracking-[0.2em] uppercase"
            style={{ color: "#6B7294" }}
          >
            Typ
          </span>
          <FilterChip
            label="Alle"
            active={activeType === ""}
            onClick={() => setFilter("type", "")}
          />
          {types.map((type) => (
            <FilterChip
              key={type}
              label={typeLabels[type] || type}
              active={activeType === type}
              onClick={() =>
                setFilter("type", activeType === type ? "" : type)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300"
      style={{
        background: active
          ? "#020B60"
          : "transparent",
        color: active
          ? "#A6D30F"
          : "#6B7294",
        border: active
          ? "1px solid #020B60"
          : "1px solid #E2E5EF",
        boxShadow: active
          ? "0 2px 8px rgba(2, 11, 96, 0.2)"
          : "none",
      }}
    >
      {label}
    </button>
  );
}
