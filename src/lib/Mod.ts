enum Mod {
  NoMod = 0,
  NoFail = 1 << 0,
  Easy = 1 << 1,
  TouchDevice = 1 << 2,
  Hidden = 1 << 3,
  HardRock = 1 << 4, 
  SuddenDeath = 1 << 5,
  DoubleTime = 1 << 6,
  Relax = 1 << 7,
  HalfTime = 1 << 8,
  Nightcore = 1 << 9,
  Flashlight = 1 << 10,
  Autoplay = 1 << 11,
  SpunOut = 1 << 12,
  Autopilot = 1 << 13,
  Perfect = 1 << 14,
  Key4 = 1 << 15,
  Key5 = 1 << 16,
  Key6 = 1 << 17,
  Key7 = 1 << 18,
  Key8 = 1 << 19,
  FadeIn = 1 << 20,
  Random = 1 << 21,
  Cinema = 1 << 22,
  Target = 1 << 23,
  Key9 = 1 << 24,
  KeyCoop = 1 << 25,
  Key1 = 1 << 26,
  Key3 = 1 << 27,
  Key2 = 1 << 28,
  ScoreV2 = 1 << 29,
  Mirror = 1 << 30,
}

enum ModShortName {
  NM = "NoMod",
  NF = "NoFail",
  EZ = "Easy",
  TD = "TouchDevice",
  HD = "Hidden",
  HR = "HardRock",
  SD = "SuddenDeath",
  DT = "DoubleTime",
  RX = "Relax",
  HT = "HalfTime",
  NC = "Nightcore",
  FL = "Flashlight",
  AT = "Autoplay",
  SO = "SpunOut",
  AP = "Autopilot",
  PF = "Perfect",
  "4K" = "Key4",
  "5K" = "Key5",
  "6K" = "Key6",
  "7K" = "Key7",
  "8K" = "Key8",
  FI = "FadeIn",
  RD = "Random",
  CN = "Cinema",
  TP = "Target",
  "9K" = "Key9",
  CO = "KeyCoop",
  "1K" = "Key1",
  "3K" = "Key3",
  "2K" = "Key2",
  V2 = "ScoreV2",
  MR = "Mirror",
}

export class  Mods extends Array<Mod> {
  constructor(mods: string | number | Mods | null) {
    super();
    if (typeof mods === "string") {
      const mappedMods = mods.match(/.{1,2}/g);
      const modsres = mappedMods.map(
        (m) => ModShortName[m as keyof typeof ModShortName],
      );

      // Handle the uniqueness constraint for DoubleTime and Nightcore
      const hasDoubleTime = this.includes(Mod.DoubleTime);
      const hasNightcore = this.includes(Mod.Nightcore);

      this.push(
        ...(modsres
          .map((m) => Mod[m as keyof typeof Mod])
          .filter(
            (mod) =>
              !(mod === Mod.DoubleTime && hasNightcore) &&
              !(mod === Mod.Nightcore && hasDoubleTime),
          ) as Mod[]),
      );
    } else if (typeof mods === "number") {
      if (mods === 0) {
        this.push(Mod.NoMod);
      } else {
        this.push(
          ...(Object.values(Mod).filter((m) => mods & (m as Mod)) as Mod[]),
        );
      }
    } else {
      throw new TypeError(
        `Mods must be a list of Mod types, a string, or an int. Not ${typeof mods}`,
      );
    }
  }
  static fromString(modsString: Mod | string): number {
    const modstr = modsString as keyof typeof Mod;
    const mod = Mod[modstr];
    return Number(mod);
  }

  toString(): string {
    if (this.length === 0) {
      return "NoMod";
    }

    return this.map((mod) => {
      if (this.includes(Mod.Nightcore) && mod === Mod.DoubleTime) {
        return "";
      }

      if (this.includes(Mod.Perfect) && mod === Mod.SuddenDeath) {
        return "";
      }

      return mod.toString();
    }).join("");
  }
}
export function modsToStringList(mods: Mod[]): string[] {
  return mods.map((mod) => Mod[mod]);
}

