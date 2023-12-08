import Clock from "@components/server/Clock";
import { Time } from "@customTypes/Time";
import loadTime from "@server/api/time/loadTime";

export default async function ServerClock() {
  const response = await loadTime();
  const time = (await response.json()) as Time;
  return (
    <Clock
      time={new Date(time.datetime).toLocaleTimeString()}
      timezone={time.timezone}
    />
  );
}
