import { CharacterCard } from "@components/server/CharacterCard";
import { CharacterDataWrapper } from "@customTypes/CharacterTypes";
import { Grid } from "@mui/material";
import loadCharacters from "@server/api/characters/loadCharacters";

export default async function CharacterCardList() {
  const response = await loadCharacters();
  const dataWrapper = (await response.json()) as CharacterDataWrapper;
  const { data, attributionText } = dataWrapper;

  return (
    <>
      {data.results.map((character) => {
        return (
          <Grid
            item
            key={crypto.randomUUID()}
            xs={12}
            md={3}
            className="flex justify-evenly"
          >
            <CharacterCard
              character={character}
              attributionText={attributionText}
              href={`/characters/${character.id}`}
            />
          </Grid>
        );
      })}
    </>
  );
}
