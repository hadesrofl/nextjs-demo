"use server";
import createApiCredentials from "@helper/createHashKey";
import isDevMode from "@helper/isDevMode";
import getMockCharacters from "@server/mockData/mockCharacters";

export default async function loadCharacter(characterId: string) {
  const { timestamp, publicKey, keyHash } = await createApiCredentials();
  return isDevMode()
    ? Response.json(await loadMockCharacter(Number.parseInt(characterId)))
    : await fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${timestamp}&apikey=${publicKey}&hash=${keyHash}`
      );
}

async function loadMockCharacter(characterId: number) {
  const characters = await getMockCharacters();
  characters.data.results = characters.data.results.filter(
    (character) => character.id === characterId
  );
  characters.data.count = characters.data.results.length;
  characters.data.limit = 1;
  characters.data.offset = 0;
  characters.data.total = characters.data.count;
  return characters;
}
