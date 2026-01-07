import { partyCreateModel, partyUpdateModel } from "./party.model";
import { countParty, getTotalPartyCount, getParty, HEADERS, getPartyByPartyName, insertParty, getPartyById, updateParty } from "./party.repository";
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

export async function updateExsitingParty(data, currentUser) {
  const { editId, ...updateData } = data;
  const valid = partySchema.safeParse(updateData);

  if (!valid.success) {
    const fieldErrors = valid.error.flatten().fieldErrors;
    const messages = Object.values(fieldErrors).flat();
    return { message: messages[0], ok: false };
  }

  let result = await getPartyById(editId)
  console.log(result)

  if (!result?._id) {
    return { message: `Party not exist`, ok: false };
  }

  result = await getPartyByPartyName(data.name, editId)

  if (result?._id) {
    return { message: `Party name "${result.name}" alredy exist`, ok: false };
  }

  const updatableInput = partyUpdateModel(data, { updatedBy: currentUser.id })

  result = await updateParty(editId, updatableInput);

  if (!result.acknowledged) {
    return { message: `Faild to update Party`, ok: false };
  }

  return { message: 'Party Updated Successful', ok: true }
}