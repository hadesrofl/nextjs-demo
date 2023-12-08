import Clock from "@components/server/Clock";
import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Skeleton variant="rounded" className="bg-slate-200">
      <Clock time="12:15:42" timezone="Europe/Berlin" />
    </Skeleton>
  );
}
