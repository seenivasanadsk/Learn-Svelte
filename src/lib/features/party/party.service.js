import { countParty, getTotalPartyCount, getParty, HEADERS } from "./party.repository";

export async function getPartyList() {
  const userList = {
    items: await getParty(),
    headers: HEADERS,
    total: await getTotalPartyCount(),
    showed: await countParty(),
  }
  return userList
}