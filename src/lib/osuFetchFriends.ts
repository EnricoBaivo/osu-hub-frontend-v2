import type { UserExtendedOsu } from "@/types/userExtendedOsu";

export const osuFetchFriends = async (access_token?: string | null) => {
  const res = await fetch("https://osu.ppy.sh/api/v2/friends", {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = (await res.json()) as UserExtendedOsu & {
    authentication: string;
  };
  if (data.authentication == "basic") {
    // console.log("try delete", delRes);
    return null;
  }
  return data;
};
