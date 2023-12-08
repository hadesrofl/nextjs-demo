import { notFound } from "next/navigation";
import { Grid, Skeleton } from "@mui/material";
import loadCharacters from "@server/api/characters/loadCharacters";
import loadCharacter from "@server/api/characters/loadCharacter";
import { CharacterDataWrapper } from "@customTypes/CharacterTypes";
import CenteredBox from "@components/server/CenteredBox";
import { CharacterCard } from "@components/server/CharacterCard";
import { Suspense } from "react";
import { CardSkeleton } from "@components/server/skeletons/CardSkeleton";
import SeriesCardList from "@components/server/SeriesCardList";
import Loading from "../loading";

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

  return (
    <CenteredBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} className="flex items-stretch">
          <Suspense
            fallback={
              <Skeleton className="bg-slate-200">
                <CardSkeleton />
              </Skeleton>
            }
          ></Suspense>
          <CharacterCard
            character={character}
            attributionText={attributionText}
          />
        </Grid>
        <Suspense fallback={<Loading />}>
          <SeriesCardList characterId={character.id.toString()} />
        </Suspense>
      </Grid>
    </CenteredBox>
  );
}
