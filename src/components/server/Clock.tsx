import { Stack, Typography } from "@mui/material";

type ClockProps = {
  time: string;
  timezone: string;
};

export default function Clock(props: ClockProps) {
  const { time, timezone } = props;
  return (
    <Stack className="items-center">
      <Typography variant="h1" component="h1" suppressHydrationWarning>
        {time}
      </Typography>
      <Typography variant="subtitle2">{timezone}</Typography>
    </Stack>
  );
}
