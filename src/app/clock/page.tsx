import ClientClock from "@components/ClientClock";
import ServerClock from "@components/server/ServerClock";
import { Stack } from "@mui/system";
import { Suspense } from "react";
import Loading from "./loading";

export default function ClockPage() {
  return (
    <Stack className="items-center" spacing={8}>
      <Suspense fallback={<Loading />}>
        <ServerClock />
      </Suspense>
      <ClientClock />
    </Stack>
  );
}
