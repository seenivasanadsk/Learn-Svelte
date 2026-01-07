import { partyCreateModel } from "./party.model";
import { countParty, getTotalPartyCount, getParty, HEADERS, getPartyByPartyName, insertParty } from "./party.repository";
import { partySchema } from "./party.schema";

export async function getPartyList() {
  const userList = {
    items: await getParty(),
    headers: HEADERS,
    total: await getTotalPartyCount(),
    showed: await countParty(),
  }
  return userList
}

export async function createNewParty(data, currentUser) {
  const valid = partySchema.safeParse(data);

  if (!valid.success) {
    const fieldErrors = valid.error.flatten().fieldErrors;
    const messages = Object.values(fieldErrors).flat();
    return { message: messages[0], ok: false };
  }

  let result = await getPartyByPartyName(data.name)

  if (result?._id) {
    return { message: `Party name "${result.name}" alredy exist`, ok: false };
  }

  const createableInput = partyCreateModel(data, { createdBy: currentUser.id })

  result = await insertParty(createableInput);

  if (!result.acknowledged) {
    return { message: `Faild to create Party`, ok: false };
  }

  return { message: 'Party Created Successful', ok: true }
}