"use server";
import { Series, SeriesDataWrapper } from "@customTypes/Series";
import { createEmptyDataWrapper } from "@customTypes/shared/Container";
import createApiCredentials from "@helper/createHashKey";
import { loadWithDescriptionAndThumbnail } from "@helper/getModelSummaries";
import isDevMode from "@helper/isDevMode";
import {
  calculateAllowedFetchLimit,
  extractDataWrapper,
  updateGetQueryParams,
} from "@helper/marvelApi";
import getMockSeries from "@server/mockData/mockSeries";

type OrderBy =
  | "startYear"
  | "title"
  | "modified"
  | "-title"
  | "-modified"
  | "-startYear";

export default async function loadSeries(characterId: string | number) {
  return loadSeriesWithDescriptionAndThumbnail(characterId);
}

async function fetchSeries(
  characterId: string | number,
  limit: number,
  offset: number,
  orderBy: OrderBy = "-startYear"
) {
  const { timestamp, publicKey, keyHash } = await createApiCredentials();
  const response = isDevMode()
    ? Response.json(await getMockSeries())
    : await fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/series?ts=${timestamp}&apikey=${publicKey}&hash=${keyHash}&orderBy=${orderBy}&limit=${limit}&offset=${offset}`,
        { next: { revalidate: 86400 } } // update cache once per day
      );

  return await extractDataWrapper<Series>(response);
}

async function loadSeriesWithDescriptionAndThumbnail(
  characterId: string | number
) {
  const limit = 10;
  let offset = 0;
  let total = 0;
  let finalDataWrapper: SeriesDataWrapper = createEmptyDataWrapper<Series>();

  do {
    const fetchLimit = calculateAllowedFetchLimit(total, limit, offset);
    const wrapper = await fetchSeries(characterId, fetchLimit, offset);
    const params = updateGetQueryParams(wrapper.data, offset);

    offset = params.offset;
    total = params.total;

    finalDataWrapper = await loadWithDescriptionAndThumbnail(
      wrapper.data,
      {
        attributionText: wrapper.attributionText,
        copyright: wrapper.copyright,
      },
      finalDataWrapper.data.results,
      limit
    );
  } while (
    !isDevMode() &&
    offset < total &&
    finalDataWrapper.data.results.length < limit
  );

  return Response.json(finalDataWrapper);
}
