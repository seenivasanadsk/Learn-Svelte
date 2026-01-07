// src\routes\(protected)\party\+page.server.js

import { getPartyById } from "$lib/features/party/party.repository.js";
import { createNewParty, getPartyList, updateExsitingParty } from "$lib/features/party/party.service";
import { formDataToObject } from "$lib/utils/form.js";
import { serializeDoc } from "$lib/utils/serializer";
import { fail } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export async function load({ depends, url }) {
  depends('PARTY_UPDATED')
  const editId = url.searchParams.get('editId')
  let editableData = null
  if (editId && ObjectId.isValid(editId)) {
    editableData = await getPartyById(editId)
    editableData = serializeDoc(editableData)
  }
  let parties = await getPartyList();
  parties = serializeDoc(parties)
  return { listData: parties, editableData }
}

export const actions = {
  create: async ({ request, locals }) => {
    const currentUser = locals?.user;
    const formData = await request.formData();
    const input = formDataToObject(formData)

    const result = await createNewParty(input, currentUser)

    if (!result?.ok) {
      return fail(400, { message: result.message });
    }

    return serializeDoc(result);
  },
  update: async ({ request, locals }) => {
    const currentUser = locals?.user;
    const formData = await request.formData();
    const input = formDataToObject(formData)

    const result = await updateExsitingParty(input, currentUser)

    if (!result?.ok) {
      return fail(400, { message: result.message });
    }

    return serializeDoc(result);
  }
};