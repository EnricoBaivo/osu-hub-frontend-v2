export function seconds_to_DHMS(seconds: number) {
  // Define the input number of seconds

  // Calculate the number of days, hours, minutes, and remaining seconds
  const days = Math.floor(seconds / 86400); // 86400 seconds in a day (24 hours * 60 minutes * 60 seconds)
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600); // 3600 seconds in an hour (60 minutes * 60 seconds)
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return { days, hours, minutes, seconds: remainingSeconds };
}
