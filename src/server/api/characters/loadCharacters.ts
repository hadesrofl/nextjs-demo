"use server";
import { Character, CharacterDataWrapper } from "@customTypes/CharacterTypes";
import { createEmptyDataWrapper } from "@customTypes/shared/Container";
import createApiCredentials from "@helper/createHashKey";
import { loadWithDescriptionAndThumbnail } from "@helper/getModelSummaries";
import isDevMode from "@helper/isDevMode";
import {
  calculateAllowedFetchLimit,
  extractDataWrapper,
  updateGetQueryParams,
} from "@helper/marvelApi";
import getMockCharacters from "@server/mockData/mockCharacters";

export default async function loadCharacters() {
  return loadCharactersWithDescriptionAndThumbnail();
}

async function fetchCharacters(limit: number, offset: number) {
  const { timestamp, publicKey, keyHash } = await createApiCredentials();
  const response = isDevMode()
    ? Response.json(await getMockCharacters())
    : await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${keyHash}&limit=${limit}&offset=${offset}`,
        { next: { revalidate: 86400 } } // update cache once per day
      );

  return await extractDataWrapper<Character>(response);
}

async function loadCharactersWithDescriptionAndThumbnail() {
  const limit = 100;
  let offset = 0;
  let total = 0;
  let finalDataWrapper: CharacterDataWrapper =
    createEmptyDataWrapper<Character>();

  do {
    const fetchLimit = calculateAllowedFetchLimit(total, limit, offset);
    const wrapper = await fetchCharacters(fetchLimit, offset);
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
