import CharacterCard from "@components/CharacterCard";
import { notFound } from "next/navigation";
import { Grid } from "@mui/material";
import SeriesCard from "@components/SeriesCard";
import loadCharacters from "@server/api/characters/loadCharacters";
import loadSeries from "@server/api/series/loadSeries";
import loadCharacter from "@server/api/characters/loadCharacter";
import { CharacterDataWrapper } from "@customTypes/CharacterTypes";
import { SeriesDataWrapper } from "@customTypes/Series";
import CenteredBox from "@components/CenteredBox";

type CharacterPageProps = {
  params: {
    id: string;
  };
};

/**
 * This method generates the necessary params at build time for the component.
 * @returns
 */
export async function generateStaticParams() {
  const response = await loadCharacters();
  const characterDataWrapper = (await response.json()) as CharacterDataWrapper;
  return characterDataWrapper.data.results.map((character) => ({
    id: character.id.toString(),
  }));
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = params;
  // this will run at build time and generate the pages for each given param
  const characterResponse = await loadCharacter(id);
  const { data, attributionText } =
    (await characterResponse.json()) as CharacterDataWrapper;
  if (data.count !== 1) notFound();
  const character = data.results[0];
  const seriesResponse = await loadSeries(character.id);
  const seriesDataWrapper = (await seriesResponse.json()) as SeriesDataWrapper;

  return (
    <CenteredBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} className="flex items-stretch">
          <CharacterCard
            character={character}
            attributionText={attributionText}
          />
        </Grid>
        {seriesDataWrapper.data.results.map((series) => {
          return (
            <Grid
              key={crypto.randomUUID()}
              item
              xs={12}
              md={2}
              className="flex items-stretch"
            >
              <SeriesCard
                series={series}
                attributionText={seriesDataWrapper.attributionText}
              />
            </Grid>
          );
        })}
      </Grid>
    </CenteredBox>
  );
}
