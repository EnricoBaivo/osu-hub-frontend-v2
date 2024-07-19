import type { UserExtendedOsu } from "@/types/userExtendedOsu";

export const osuFetchUser = async (access_token?: string | null) => {
  const res = await fetch("https://osu.ppy.sh/api/v2/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = (await res.json()) as UserExtendedOsu & {
    authentication: string;
  };
  if (data.authentication == "basic") {
    // const delRes = await db.account.delete({
    //   where: { id: user_account_id },
    // });
    // console.log("try delete", delRes);
    return null;
  }
  return data;
};
