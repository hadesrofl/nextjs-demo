"use server";
import { createHash } from "crypto";

export default async function createApiCredentials() {
  const timestamp = Date.now();
  const privateKey = process.env.MARVEL_PRIVATE_API_KEY;
  const publicKey = process.env.MARVEL_PUBLIC_API_KEY;
  const content = `${timestamp}${privateKey}${publicKey}`;
  return {
    keyHash: createHash("md5").update(content).digest("hex"),
    publicKey,
    timestamp,
  };
}
