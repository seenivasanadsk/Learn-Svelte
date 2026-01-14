import { countUsers, getTotalUsersCount, getUsers, HEADERS } from "./user.repository";

export async function getUsersList() {
  const userList = {
    items: await getUsers(),
    headers: HEADERS,
    total: await getTotalUsersCount(),
    showed: await countUsers(),
  }
  return userList
}