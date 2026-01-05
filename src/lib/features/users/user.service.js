import { countUsers, getTotalUsers, getUsers, HEADERS } from "./user.repository";

export async function getUsersList() {
  const userList = {
    items: await getUsers(),
    headers: HEADERS,
    total: await getTotalUsers(),
    showed: await countUsers(),
  }
  return userList
}