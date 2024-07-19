export function getPercentiles(
  arr: (number | null)[],
): Record<string, number | null> {
  /**
   * Returns the percentiles for 50%, 89%, 90%, 95%, 99%.
   */
  if (!arr) return {};

  const sorted_arr: (number | null)[] = arr
    .slice()
    .sort((a, b) => (a ?? 0) - (b ?? 0));
  const percentiles = [0.5, 0.89, 0.9, 0.95, 0.99];
  const percentile_dict: Record<string, number | null> = {};

  percentiles.forEach((percentile) => {
    const index = Math.ceil(percentile * sorted_arr.length) - 1;
    percentile_dict[percentile] = sorted_arr[index] ?? null;
  });
  return percentile_dict;
}
