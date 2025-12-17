"use client";

import { useCallback, useMemo, useState } from "react";
import type { Species } from "../../../types/swapi";
import { useSwapi } from "../../hooks/use-swapi";
import { SearchBar } from "../../dashboard/search-bar";
import { EntityCard } from "../../dashboard/entity-card";
import { EntityDetailModal } from "../../dashboard/entity-detail-modal";
import { LoadingState } from "../../dashboard/loading-state";
import { ErrorState } from "../../dashboard/error-state";
import { EmptyState } from "../../dashboard/empty-state";
import { PaginationControls } from "../../dashboard/pagination-controls";

function safeText(v: unknown, fallback = "—") {
  if (v === null || v === undefined) return fallback;
  const s = String(v).trim();
  return s.length ? s : fallback;
}

export default function SpeciesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  const {
    data,
    loading,
    error,
    page,
    totalCount,
    hasNext,
    hasPrevious,
    goToNextPage,
    goToPreviousPage,
    refresh,
  } = useSwapi<Species>("species", 1, searchTerm);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const detailSections = useMemo(() => {
    if (!selectedSpecies) return [];

    return [
      { label: "Classification", value: safeText(selectedSpecies.classification) },
      { label: "Designation", value: safeText(selectedSpecies.designation) },
      { label: "Average Height", value: `${safeText(selectedSpecies.average_height)} cm` },
      { label: "Average Lifespan", value: safeText(selectedSpecies.average_lifespan) },
      { label: "Language", value: safeText(selectedSpecies.language) },
      { label: "Skin Colors", value: safeText(selectedSpecies.skin_colors) },
      { label: "Hair Colors", value: safeText(selectedSpecies.hair_colors) },
      { label: "Eye Colors", value: safeText(selectedSpecies.eye_colors) },
    ];
  }, [selectedSpecies]);

  if (loading && (!data || data.length === 0)) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-950 via-gray-950 to-black">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm tracking-widest text-yellow-300/80">SPACEQUEST • SPECIES</p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">Species</h1>
            <p className="mt-2 text-sm text-white/60">Loading species registry...</p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-6">
            <LoadingState />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-950 via-gray-950 to-black">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <p className="text-sm tracking-widest text-red-300/80">ERROR</p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">Species</h1>
            <div className="mt-4">
              <ErrorState message={error} onRetry={refresh} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-950 via-gray-950 to-black">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.10),transparent_40%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.10),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 py-8 space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
            <div>
              <p className="text-sm tracking-widest text-yellow-300/80">SPACEQUEST • SPECIES</p>
              <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">Species</h1>
              <p className="mt-2 text-sm text-white/60">
                Search species, open a card, and explore biological details in the modal.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Page: <span className="ml-1 text-white">{page}</span>
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Total: <span className="ml-1 text-white">{totalCount ?? 0}</span>
                </span>

                {searchTerm ? (
                  <span className="inline-flex items-center rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-200">
                    Filter: <span className="ml-1 font-semibold">{searchTerm}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    No filter
                  </span>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="w-full xl:w-[520px]">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <SearchBar onSearch={handleSearch} placeholder="Search species..." />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {data && data.length > 0 ? (
          <>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-6">
              <div className="grid items-stretch gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-[1fr]">
                {data.map((s, idx) => (
                  <div key={`${s.name}-${idx}`} className="h-full transition-transform hover:-translate-y-0.5">
                    <div className="h-full">
                      <EntityCard
                        title={safeText(s.name)}
                        subtitle={`${safeText(s.classification)} • ${safeText(s.designation)}`}
                        badges={[
                          `Lang: ${safeText(s.language)}`,
                          `Life: ${safeText(s.average_lifespan)}`,
                          `Height: ${safeText(s.average_height)}cm`,
                        ]}
                        onClick={() => setSelectedSpecies(s)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-6">
              <PaginationControls
                currentPage={page}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
                onNext={goToNextPage}
                onPrevious={goToPreviousPage}
                totalCount={totalCount}
              />
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
            <EmptyState title="No species found" description="Try adjusting your search criteria" />
          </div>
        )}

        <EntityDetailModal
          open={!!selectedSpecies}
          onOpenChange={(open) => !open && setSelectedSpecies(null)}
          title={selectedSpecies?.name || ""}
          description={
            selectedSpecies
              ? `${safeText(selectedSpecies.classification)} • Language: ${safeText(selectedSpecies.language)}`
              : ""
          }
          sections={detailSections}
        />
      </div>
    </div>
  );
}
