import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchSwapiList } from "../lib/swapi";

export function useSwapi<T>(resource: string, initialPage = 1, searchTerm = "") {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(initialPage);

  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const abortRef = useRef<AbortController | null>(null);

  // Reset to page 1 when search term changes
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

      const res = await fetchSwapiList<T>(resource, page, searchTerm, controller.signal);

      setData(res.results);
      setNextPage(res.next);
      setPreviousPage(res.previous);
      setTotalCount(res.count);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [resource, page, searchTerm]);

  useEffect(() => {
    void load();
    return () => abortRef.current?.abort();
  }, [load]);

  const goToNextPage = useCallback(() => {
    if (nextPage) setPage((p) => p + 1);
  }, [nextPage]);

  const goToPreviousPage = useCallback(() => {
    if (previousPage) setPage((p) => Math.max(1, p - 1));
  }, [previousPage]);

  const refresh = useCallback(() => {
    void load();
  }, [load]);

  const hasNext = useMemo(() => !!nextPage, [nextPage]);
  const hasPrevious = useMemo(() => !!previousPage, [previousPage]);

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
