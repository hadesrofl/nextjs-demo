import loadCharacters from "@server/api/characters/loadCharacters";

export async function GET() {
  return await loadCharacters();
}
