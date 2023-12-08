import CenteredBox from "@components/server/CenteredBox";
import { CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";

type LoadingSpinnerProps = {
  text?: string;
};

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  const { text } = props;
  return (
    <CenteredBox>
      <Stack className="items-center" spacing={8}>
        <CircularProgress size="10rem" />
        <Typography variant="h5">{text}</Typography>
      </Stack>
    </CenteredBox>
  );
}
