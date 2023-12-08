import { Grid, Skeleton } from "@mui/material";
import { Suspense } from "react";
import { CardSkeleton } from "@components/server/skeletons/CardSkeleton";
import CharacterCardList from "@components/server/CharacterCardList";

export default async function CharacterLandingPage() {
  return (
    <Grid container spacing={3} className="flex">
      <Suspense
        fallback={[1, 2, 3, 4].map(() => {
          return (
            <Grid
              key={crypto.randomUUID()}
              item
              xs={12}
              md={3}
              className="flex items-stretch"
            >
              <Skeleton className="bg-white">
                <CardSkeleton />
              </Skeleton>
            </Grid>
          );
        })}
      >
        <CharacterCardList />
      </Suspense>
    </Grid>
  );
}
