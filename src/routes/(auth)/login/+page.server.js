import { getAllUsernames } from "../../../features/users/user.repository";

export async function load() {
  const result = await getAllUsernames()
  const userList = result.map(user => user.username)
  return { userList }
}