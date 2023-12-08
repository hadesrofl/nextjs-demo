import { CardSkeleton } from "@components/server/skeletons/CardSkeleton";
import { Grid, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <>
      {[1, 2, 3, 4].map(() => {
        return (
          <Grid
            key={crypto.randomUUID()}
            item
            xs={12}
            md={2}
            className="flex items-stretch"
          >
            <Skeleton className="bg-slate-200">
              <CardSkeleton />
            </Skeleton>
          </Grid>
        );
      })}
    </>
  );
}
