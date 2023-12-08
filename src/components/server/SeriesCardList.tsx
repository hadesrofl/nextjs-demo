import SeriesCard from "@components/server/SeriesCard";
import { SeriesDataWrapper } from "@customTypes/Series";
import { Grid } from "@mui/material";
import loadSeries from "@server/api/series/loadSeries";

type SeriesCardListProps = {
  characterId: string;
};

export default async function SeriesCardList(props: SeriesCardListProps) {
  const { characterId } = props;
  const seriesResponse = await loadSeries(characterId);
  const seriesDataWrapper = (await seriesResponse.json()) as SeriesDataWrapper;
  return (
    <>
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
    </>
  );
}
