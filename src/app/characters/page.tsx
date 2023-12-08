import { Grid } from "@mui/material";
import CharacterCard from "@components/CharacterCard";
import loadCharacters from "@server/api/characters/loadCharacters";
import { CharacterDataWrapper } from "@customTypes/CharacterTypes";

export default async function CharacterLandingPage() {
  const response = await loadCharacters();
  const dataWrapper = (await response.json()) as CharacterDataWrapper;
  const { data, attributionText } = dataWrapper;

  return (
    <Grid container spacing={3} className="flex">
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
    </Grid>
  );
}
