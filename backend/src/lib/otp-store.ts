// ─── In-memory OTP store ──────────────────────────────────────────────────────
// Stores { code, expiresAt } keyed by lower-cased email.
// Not persisted across server restarts — fine for development.
// For production, swap this for Redis or a DB table.

interface OtpEntry {
  code: string;
  expiresAt: number; // Unix ms timestamp
}

const store = new Map<string, OtpEntry>();

const TTL_MS = 10 * 60 * 1000; // 10 minutes

/** Generate a random 4-digit string and save it. */
export function storeOtp(email: string): string {
  const code = String(Math.floor(1000 + Math.random() * 9000)); // 1000–9999
  store.set(email.toLowerCase(), { code, expiresAt: Date.now() + TTL_MS });
  return code;
}

/**
 * Returns true if the code is correct and not expired.
 * Does NOT delete the entry — call deleteOtp() after successful registration.
 */
export function verifyOtp(email: string, code: string): boolean {
  const entry = store.get(email.toLowerCase());
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) { store.delete(email.toLowerCase()); return false; }
  return entry.code === code.trim();
}

/** Remove the OTP after it has been used. */
export function deleteOtp(email: string): void {
  store.delete(email.toLowerCase());
}
