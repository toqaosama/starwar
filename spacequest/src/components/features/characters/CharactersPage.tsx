import { useCallback, useMemo, useState } from "react";
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Characters</h1>
        </div>
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Characters</h1>
        <ErrorState message={error} onRetry={refresh} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Characters</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search characters..." />
      </div>

      {data && data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((person, idx) => (
              <EntityCard
                key={`${person.name}-${idx}`}
                title={person.name}
                subtitle={`Birth Year: ${person.birth_year}`}
                badges={[person.gender, `${person.height}cm`, person.eye_color]}
                onClick={() => setSelectedPerson(person)}
              />
            ))}
          </div>

          <PaginationControls
            currentPage={page}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onNext={goToNextPage}
            onPrevious={goToPreviousPage}
            totalCount={totalCount}
          />
        </>
      ) : (
        <EmptyState title="No characters found" description="Try adjusting your search criteria" />
      )}

      <EntityDetailModal
        open={!!selectedPerson}
        onOpenChange={(open) => !open && setSelectedPerson(null)}
        title={selectedPerson?.name || ""}
        description={selectedPerson ? `Born ${selectedPerson.birth_year}` : ""}
        sections={detailSections}
      />
    </div>
  );
}
