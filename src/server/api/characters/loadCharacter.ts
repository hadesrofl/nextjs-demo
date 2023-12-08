"use server";
import createApiCredentials from "@helper/createHashKey";

export default async function loadCharacter(characterId: string) {
  const { timestamp, publicKey, keyHash } = await createApiCredentials();
  return await fetch(
    `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${timestamp}&apikey=${publicKey}&hash=${keyHash}`
  );
}
