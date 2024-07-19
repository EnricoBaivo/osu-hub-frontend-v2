export function secondsToMinutesAndSeconds(seconds: number): {
  minutes: number;
  remainingSeconds: number;
} {
  /** Converts a number of seconds into an object of the format {minutes, remainingSeconds} */
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return { minutes, remainingSeconds };
}

export function secondsToMinutesAndSecondsString(
  seconds: number,
  withLeadingZero: boolean,
): string {
  /**
   * Converts a number of seconds into a string of the format mm:ss
   */

  const { minutes, remainingSeconds } = secondsToMinutesAndSeconds(seconds);
  let minStr = minutes.toString();

  if (withLeadingZero && minStr.length === 1) {
    minStr = `0${minStr}`.slice(-2);
  }

  return `${minStr}:${remainingSeconds}`;
}
export function stringToSeconds(string: string): number {
  /** Converts a string of the format mm:ss into seconds  */
  const [minutes, seconds] = string.split(":").map((x) => parseInt(x));
  return (minutes ?? 0) * 60 + (seconds ?? 0);
}
