const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Mirrors QStash's documented retry schedule: exponential, capped at one hour.
 * `attempt` is 1-indexed for the post-failure delay (attempt=1 means we just
 * failed the first try and are waiting before the second).
 */
export function backoffMs(attempt: number): number {
  const exp = 2 ** Math.max(0, attempt - 1);
  return Math.min(exp * 1_000, ONE_HOUR_MS);
}
