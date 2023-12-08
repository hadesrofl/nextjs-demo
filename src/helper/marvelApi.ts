import {
  ContainerMetadata,
  GenericDataWrapper,
} from "@customTypes/shared/Container";

export function calculateAllowedFetchLimit(
  total: number,
  limit: number,
  offset: number
) {
  return total !== 0 && offset + limit > total ? total - offset : limit;
}

export async function extractDataWrapper<T>(response: Response) {
  const data = await response.json();
  if (data.code && data.code === "RequestThrottled")
    throw new Error("Daily rate limit reached with Marvel API");

  return data as GenericDataWrapper<T>;
}

export function updateGetQueryParams(
  metadata: ContainerMetadata,
  offset: number
) {
  offset += metadata.count;
  return { total: metadata.total, offset };
}
