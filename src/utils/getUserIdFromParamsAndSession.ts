import type { Session } from "next-auth";

export const getUserIdFromParams = (
  session: Session,
  params?: Record<string, string>,
) => {
  if (params?.user_id && params?.user_id !== "me") {
    return Number(params.user_id);
  } else {
    return Number(session.user.osu_user_id);
  }
};
