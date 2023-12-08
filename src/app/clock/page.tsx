import CenteredBox from "@components/CenteredBox";
import { Time } from "@customTypes/Time";
import { Stack, Typography } from "@mui/material";
import loadTime from "@server/api/time/loadTime";

export default async function Clock() {
  const response = await loadTime();
  const time = (await response.json()) as Time;
  return (
    <CenteredBox>
      <Stack className="items-center">
        <Typography variant="h1">
          {new Date(time.datetime).toLocaleTimeString()}
        </Typography>
        <Typography variant="subtitle2">{time.timezone}</Typography>
      </Stack>
    </CenteredBox>
  );
}
