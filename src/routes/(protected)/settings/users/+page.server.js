// src\routes\(protected)\settings\users\+page.server.js

import { getUsersList } from "$lib/features/users/user.service";
import { serializeDoc } from "$lib/utils/serializer";

export async function load({ depends }) {
  depends('USER_UPDATED')
  let users = await getUsersList();
  users = serializeDoc(users)
  return { listData: users }
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    console.log(data);
    return { seeni: "test" }
  }
}