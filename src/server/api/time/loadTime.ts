"use server";
export default async function loadTime() {
  return await fetch("http://worldtimeapi.org/api/ip", {
    next: { revalidate: 30 },
  });
}
