import loadTime from "@server/api/time/loadTime";

export async function GET() {
  return await loadTime();
}
