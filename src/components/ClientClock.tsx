"use client";
import { Time } from "@customTypes/Time";
import { useState, useEffect } from "react";
import Clock from "./server/Clock";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function getCurrentTime() {
  const now = dayjs();
  const datetime = now.toISOString();
  const utcString = now.utc().format();
  const utc_offset = utcString.substring(
    utcString.length - 5,
    utcString.length - 1
  );
  const utc_datetime = now.utc().toISOString();
  const timezone = dayjs.tz.guess();
  return { timezone, datetime, utc_datetime, utc_offset };
}

export default function ClientClock() {
  const [currentTime, setCurrentTime] = useState<Time>(getCurrentTime());
  const interval = 1000;

  useEffect(() => {
    const tick = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, interval);
    return () => clearInterval(tick);
  }, []);

  return (
    <Clock
      time={new Date(currentTime.datetime).toLocaleTimeString()}
      timezone={currentTime.timezone}
    />
  );
}
