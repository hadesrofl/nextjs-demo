"use server";
import { Series, SeriesDataWrapper } from "@customTypes/Series";
import createApiCredentials from "@helper/createHashKey";

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

async function loadSeriesWithDescriptionAndThumbnail(
  characterId: string | number
) {
  const { timestamp, publicKey, keyHash } = await createApiCredentials();
  const orderBy: OrderBy = "-startYear";
  const limit = 10;
  let offset = 0;
  let total = 0;
  let series: Series[] = [];
  let returnWrapper: SeriesDataWrapper;
  do {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${characterId}/series?ts=${timestamp}&apikey=${publicKey}&hash=${keyHash}&orderBy=${orderBy}&limit=${limit}&offset=${offset}`,
      { next: { revalidate: 86400 } } // update cache once per day
    );
    const wrapper = (await response.json()) as SeriesDataWrapper;
    offset += wrapper.data.count;
    total = wrapper.data.total;
    series = series.concat(
      wrapper.data.results.filter(
        (character) =>
          character.description &&
          !character.thumbnail.path.includes("not_available")
      )
    );

    while (series.length > limit) series.pop();

    returnWrapper = {
      data: {
        results: series,
        total: wrapper.data.total,
        count: wrapper.data.count,
        offset: wrapper.data.offset,
        limit: wrapper.data.limit,
      },
      attributionText: wrapper.attributionText,
      copyright: wrapper.copyright,
    };
  } while (offset < total && returnWrapper.data.results.length < limit);

  return Response.json(returnWrapper);
}
