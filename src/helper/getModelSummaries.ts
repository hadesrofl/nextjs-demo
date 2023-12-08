import {
  ContainerMetadata,
  Attribution,
  GenericDataWrapper,
  GenericDataContainer,
} from "@customTypes/shared/Container";
import { ModelSummary } from "@customTypes/shared/ModelSummary";

export function addResultsWithDescriptionAndThumbnail<T extends ModelSummary>(
  destination: T[],
  newEntries: T[]
) {
  return destination.concat(
    newEntries.filter(
      (entry) =>
        entry.description && !entry.thumbnail.path.includes("not_available")
    )
  );
}

export function createDataContainer<T>(
  metadata: ContainerMetadata,
  results: T[]
): GenericDataContainer<T> {
  return {
    results: results,
    total: metadata.total,
    count: metadata.count,
    offset: metadata.offset,
    limit: metadata.limit,
  };
}

export async function loadWithDescriptionAndThumbnail<T extends ModelSummary>(
  dataContainer: GenericDataContainer<T>,
  attribution: Attribution,
  results: T[],
  limit: number
) {
  results = addResultsWithDescriptionAndThumbnail(
    results,
    dataContainer.results
  );

  while (results.length > limit) results.pop();

  dataContainer.results = results;
  dataContainer.count = dataContainer.results.length;

  return {
    attributionText: attribution.attributionText,
    copyright: attribution.copyright,
    data: createDataContainer(dataContainer, dataContainer.results),
  };
}
