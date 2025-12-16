import type { SwapiListResponse } from "../../types/swapi";

const BASE = "https://swapi.info/documentation";

export async function fetchSwapiList<T>(
  resource: string,
  page: number,
  searchTerm: string,
  signal?: AbortSignal
): Promise<SwapiListResponse<T>> {
  const url = new URL(`${BASE}/${resource}/`);
  url.searchParams.set("page", String(page));
  if (searchTerm.trim()) url.searchParams.set("search", searchTerm.trim());

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error(`SWAPI request failed: ${res.status} ${res.statusText}`);
  return (await res.json()) as SwapiListResponse<T>;
}
