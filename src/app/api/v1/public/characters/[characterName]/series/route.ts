import loadSeries from "@server/api/series/loadSeries";
import { NextRequest } from "next/server";

type SeriesGetParams = {
  characterId: string | number;
};

export async function GET(request: NextRequest, params: SeriesGetParams) {
  return await loadSeries(params.characterId);
}
