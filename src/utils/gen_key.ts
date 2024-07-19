enum ClassEnum {
  BeatmapRankStatus = 11,
  Gamemode = 12,
  UserGradeCounts = 13,
  UserBadges = 14,
  Country = 15,
  UserStats = 16,
  RankHighest = 17,
  UserAchievements = 18,
  MonthlyUserPlaycounts = 19,
  BeatmapsetGenre = 20,
  MonthlyPlaycount = 21,
  OsuUser = 22,
  Achievement = 23,
  Badge = 24,
  BeatmapsetLanguage = 25,
  BeatmapsetCovers = 26,
  BeatmapFailtimes = 28,
  Beatmapset = 29,
  BeatmapsetAvailability = 30,
  PlayerBeatmapPlays = 31,
  BeatmapStrains = 32,
  BeatmapPrediction = 33,
  BeatmapPredictionsAssociations = 34,
  Beatmap = 35,
  BeatmapPP = 36,
  BeatmapDifficultyAttributes = 37,
  UserOsuHub = 38,
  ScoreStatistics = 39,
  ScoreWeight = 40,
  ModsAssociations = 41,
  Score = 42,
  Mod = 43,
  OsuUserTournamentBanner = 44,
}

export function genIntFromDate(date: Date | string): number {
  if (date instanceof Date) {
  } else if (typeof date === "string") {
    date = new Date(date);
  }
  const hour = date.getHours().toString();
  const minute = date.getMinutes().toString();
  const year =
    date.getFullYear().toString().slice(0, 1) +
    date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return parseInt(year + month + hour + minute + day);
}

export function genId(enumName: string, id: number): number {
  const enumValue = ClassEnum[enumName as keyof typeof ClassEnum];
  const result = `${enumValue}${id}`;
  return parseInt(result);
}
