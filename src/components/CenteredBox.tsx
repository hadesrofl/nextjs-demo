import { Box } from "@mui/material";
import { ReactNode } from "react";

type CenteredBoxProps = {
  children: ReactNode;
};

export default function CenteredBox(props: CenteredBoxProps) {
  const { children } = props;
  return (
    <Box className="flex items-center justify-center min-h-screen min-w-full">
      {children}
    </Box>
  );
}
