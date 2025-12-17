import { useCallback, useMemo, useState, useEffect } from "react";
import type { Person } from "../../../types/swapi";
import { useSwapi } from "../../hooks/use-swapi";
import { SearchBar } from "../../dashboard/search-bar";
import { EntityCard } from "../../dashboard/entity-card";
import { EntityDetailModal } from "../../dashboard/entity-detail-modal";
import { LoadingState } from "../../dashboard/loading-state";
import { ErrorState } from "../../dashboard/error-state";
import { EmptyState } from "../../dashboard/empty-state";
import { PaginationControls } from "../../dashboard/pagination-controls";

export default function CharactersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

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
  } = useSwapi<Person>("people", 1, searchTerm);

  useEffect(() => {
    if (data) console.log("people data:", data);
  }, [data]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const detailSections = useMemo(() => {
    if (!selectedPerson) return [];
    return [
      { label: "Height", value: `${selectedPerson.height} cm` },
      { label: "Mass", value: `${selectedPerson.mass} kg` },
      { label: "Hair Color", value: selectedPerson.hair_color },
      { label: "Skin Color", value: selectedPerson.skin_color },
      { label: "Eye Color", value: selectedPerson.eye_color },
      { label: "Birth Year", value: selectedPerson.birth_year },
      { label: "Gender", value: selectedPerson.gender },
    ];
  }, [selectedPerson]);

  if (loading && !data) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-950 via-gray-950 to-black">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm tracking-widest text-yellow-300/80">SWAPI • PEOPLE</p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">Characters</h1>
            <p className="mt-2 text-sm text-white/60">Loading characters...</p>
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
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">Characters</h1>
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

      {/* Full width wrapper */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-8 space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
            <div>
              <p className="text-sm tracking-widest text-yellow-300/80">SWAPI • PEOPLE</p>
              <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-white">Characters</h1>
              <p className="mt-2 text-sm text-white/60">
                Search, open a character card, and view details in the modal.
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
                <SearchBar onSearch={handleSearch} placeholder="Search characters..." />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {data && data.length > 0 ? (
          <>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-6">
              {/* Same-size cards:
                 - items-stretch ensures cells stretch
                 - auto-rows-[1fr] makes all rows equal height
                 - each card wrapper is h-full so the card fills the cell */}
              <div className="grid items-stretch gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-[1fr]">
                {data.map((person, idx) => (
                  <div
                    key={`${person.name}-${idx}`}
                    className="h-full transition-transform hover:-translate-y-0.5"
                  >
                    <div className="h-full">
                      <EntityCard
                        title={person.name}
                        subtitle={`Birth Year: ${person.birth_year}`}
                        badges={[person.gender, `${person.height}cm`, person.eye_color]}
                        onClick={() => setSelectedPerson(person)}
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
            <EmptyState title="No characters found" description="Try adjusting your search criteria" />
          </div>
        )}

        <EntityDetailModal
          open={!!selectedPerson}
          onOpenChange={(open) => !open && setSelectedPerson(null)}
          title={selectedPerson?.name || ""}
          description={selectedPerson ? `Born ${selectedPerson.birth_year}` : ""}
          sections={detailSections}
        />
      </div>
    </div>
  );
}
