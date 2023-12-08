"use server";
import { Character, CharacterDataWrapper } from "@customTypes/CharacterTypes";
import createApiCredentials from "@helper/createHashKey";

export default async function loadCharacters() {
  return loadCharactersWithDescriptionAndThumbnail();
}

async function loadCharactersWithDescriptionAndThumbnail() {
  const { timestamp, publicKey, keyHash } = await createApiCredentials();
  const limit = 100;
  let offset = 0;
  let total = 0;
  let characters: Character[] = [];
  let returnWrapper: CharacterDataWrapper;
  do {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${keyHash}&limit=${limit}&offset=${offset}`,
      { next: { revalidate: 86400 } } // update cache once per day
    );
    const wrapper = (await response.json()) as CharacterDataWrapper;
    offset += wrapper.data.count;
    total = wrapper.data.total;
    characters = characters.concat(
      wrapper.data.results.filter(
        (character) =>
          character.description &&
          !character.thumbnail.path.includes("not_available")
      )
    );

    while (characters.length > limit) characters.pop();

    returnWrapper = {
      data: {
        results: characters,
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
