// src/hooks/use-swapi.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchSwapiList } from "../lib/swapi";

export function useSwapi<T>(resource: string, initialPage = 1, searchTerm = "") {
  // Full dataset from the API (we fetch once per resource)
  const [rawData, setRawData] = useState<T[]>([]); // ✅ always array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(initialPage);

  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const abortRef = useRef<AbortController | null>(null);

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError("");

      // ✅ Fetch once per resource; pagination & search are handled client-side.
      const res = await fetchSwapiList<T>(resource, 1, "", controller.signal);

      const list = res.results ?? [];
      setRawData(list); // ✅ never undefined
      setNextPage(null);
      setPreviousPage(null);
      setTotalCount(list.length);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : "Unknown error");
      setRawData([]); // ✅ keep stable
      setNextPage(null);
      setPreviousPage(null);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [resource]);

  useEffect(() => {
    void load();
    return () => abortRef.current?.abort();
  }, [load]);

  // ✅ Client-side filtering so search always works, even if the API ignores `search`.
  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return rawData;

    return rawData.filter((item) => {
      const anyItem = item as unknown as { [key: string]: unknown };

      // Common fields across SWAPI resources
      const maybeName = anyItem?.name;
      if (typeof maybeName === "string" && maybeName.toLowerCase().includes(term)) return true;

      const maybeTitle = anyItem?.title;
      if (typeof maybeTitle === "string" && maybeTitle.toLowerCase().includes(term)) return true;

      // Fallback: stringify and search (last resort)
      try {
        const asString = JSON.stringify(item).toLowerCase();
        return asString.includes(term);
      } catch {
        return false;
      }
    });
  }, [rawData, searchTerm]);

  // ✅ Client-side pagination
  const PAGE_SIZE = 10;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE)),
    [filteredData.length]
  );

  // Keep `page` in valid bounds when filtered data changes
  useEffect(() => {
    setPage((prev) => {
      if (prev < 1) return 1;
      if (prev > totalPages) return totalPages;
      return prev;
    });
  }, [totalPages]);

  const hasPrevious = useMemo(() => page > 1, [page]);
  const hasNext = useMemo(() => page < totalPages, [page, totalPages]);

  const goToNextPage = useCallback(() => {
    if (hasNext) setPage((p) => p + 1);
  }, [hasNext]);

  const goToPreviousPage = useCallback(() => {
    if (hasPrevious) setPage((p) => Math.max(1, p - 1));
  }, [hasPrevious]);

  const refresh = useCallback(() => {
    void load();
  }, [load]);

  const data = useMemo(
    () => filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredData, page]
  );

  return {
    data,
    loading,
    error,
    page,
    totalCount,
    nextPage,
    previousPage,
    hasNext,
    hasPrevious,
    goToNextPage,
    goToPreviousPage,
    refresh,
  };
}
