import type { SwapiListResponse } from "../../types/swapi";

const BASE = "https://swapi.info/api";

export async function fetchSwapiList<T>(
  resource: string,
  page: number,
  searchTerm: string,
  signal?: AbortSignal
): Promise<SwapiListResponse<T>> {
  // ✅ IMPORTANT: no trailing slash for swapi.info list endpoints
  const url = new URL(`${BASE}/${resource}`);

  // Some resources support paging/search. If it’s ignored, it’s fine.
  url.searchParams.set("page", String(page));
  if (searchTerm.trim()) url.searchParams.set("search", searchTerm.trim());

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error(`SWAPI request failed: ${res.status} ${res.statusText}`);

  const json = await res.json();

  // Classic SWAPI shape
  if (json && typeof json === "object" && "results" in json) {
    return json as SwapiListResponse<T>;
  }

  // If the API returns an array directly
  if (Array.isArray(json)) {
    return {
      count: json.length,
      next: null,
      previous: null,
      results: json as T[],
    };
  }

  throw new Error(`Unexpected SWAPI response shape`);
}
