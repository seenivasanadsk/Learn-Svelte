// src\routes\(protected)\settings\users\+page.server.js

import { getUsersList } from "$lib/features/users/user.service";
import { serializeDoc } from "$lib/utils/serializer";

export async function load({ depends }) {
  depends('USER_UPDATED')
  let users = await getUsersList();
  users = serializeDoc(users)
  return { listData: users }
}