import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_BYTES = 12;

function keyFromEnv(name: "ENCRYPTION_KEY" | "SEARCH_INDEX_KEY") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required. Copy .env.example to .env and generate a 32-byte base64 key.`);
  }

  const key = Buffer.from(value, "base64");
  if (key.length !== 32) {
    throw new Error(`${name} must decode to exactly 32 bytes.`);
  }

  return key;
}

export function encryptField(plaintext: string) {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, keyFromEnv("ENCRYPTION_KEY"), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${iv.toString("base64")}.${tag.toString("base64")}.${ciphertext.toString("base64")}`;
}

export function decryptField(payload: string) {
  const [iv, tag, ciphertext] = payload.split(".").map((part) => Buffer.from(part, "base64"));
  if (!iv || !tag || !ciphertext) {
    throw new Error("Encrypted field is malformed.");
  }

  const decipher = createDecipheriv(ALGORITHM, keyFromEnv("ENCRYPTION_KEY"), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}

export function searchIndex(value: string) {
  return createHmac("sha256", keyFromEnv("SEARCH_INDEX_KEY"))
    .update(value.trim().toLowerCase())
    .digest("base64url");
}
