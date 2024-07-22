"use server";

import { MedalInterface } from "./hooks/useFetchMedals";
import { auth } from "./server/auth";

export async function updateUser(
  osu_user_id?: string | number | undefined | null,
): Promise<boolean> {
  const session = await auth();
  if (!session) return false;

  if (!osu_user_id) return false;
  const url = `http://45.131.111.217:8000/v1/update?user_id=${osu_user_id}&called_by_admin=${
    session.user.is_admin ? "sheeesh" : "dough"
  }`;

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Origin: "https://osu-hub.com", // Fügen Sie hier Ihre Origin hinzu
    },
  });
  if (!response.ok) {
    console.log(
      "Failed to update user: ",
      response.status,
      response.statusText,
      await response.text(),
    );
    return false;
  }
  return true;
}

export async function getMedals() {
  const myHeaders = new Headers();
  myHeaders.append("Cookie", "locale=en_GB");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    next: { revalidate: 3600 * 48 },
  };
  try {
    const res = await fetch(
      "https://osekai.net/medals/api/medals.php",
      requestOptions,
    );
    if (!res.ok) {
      return [];
    }
    const medals: MedalInterface[] = await res.json();
    return medals;
  } catch (e) {
    console.log(e);
    return [];
  }
}
