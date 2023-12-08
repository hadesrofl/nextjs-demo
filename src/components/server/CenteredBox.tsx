import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

type CenteredBoxProps = {
  children: ReactNode;
};

export default function CenteredBox(props: CenteredBoxProps & BoxProps) {
  const { children } = props;
  return (
    <Box
      component="div"
      className="flex items-center justify-center min-h-screen min-w-full"
    >
      {children}
    </Box>
  );
}
