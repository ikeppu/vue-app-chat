/**
 * Returns a promise that resolves after the specified number of seconds.
 * @param seconds - Number of seconds to wait (default: 1)
 */
export const delay = (seconds: number = 1): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
