"use server";

export async function updateUser(
  osu_user_id?: string | number | undefined | null,
  called_by_admin?: boolean,
): Promise<boolean> {
  if (!osu_user_id) return false;
  const url = `http://45.131.111.217:8000/v1/update?user_id=${osu_user_id}&called_by_admin=${
    called_by_admin ? "sheeesh" : "dough"
  }`;
  console.log(url);
  
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
