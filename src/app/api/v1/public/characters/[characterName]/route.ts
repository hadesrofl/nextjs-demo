import loadCharacter from "@server/api/characters/loadCharacter";
import { NextRequest } from "next/server";

type CharacterGetParams = {
  characterId: string;
};

export async function GET(request: NextRequest, params: CharacterGetParams) {
  return await loadCharacter(params.characterId);
}
