import crypto from "crypto";

interface TokenEntry {
  email: string;
  username: string;
  expiresAt: number;
}

const tokens = new Map<string, TokenEntry>();

export function createResetToken(email: string, username: string): string {
  const token = crypto.randomBytes(32).toString("hex");
  tokens.set(token, {
    email,
    username,
    expiresAt: Date.now() + 60 * 60 * 1000,
  });
  return token;
}

export function validateResetToken(token: string): TokenEntry | null {
  const entry = tokens.get(token);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    tokens.delete(token);
    return null;
  }
  return entry;
}

export function consumeResetToken(token: string): TokenEntry | null {
  const entry = validateResetToken(token);
  if (entry) tokens.delete(token);
  return entry;
}
