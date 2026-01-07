// src\routes\(protected)\party\+page.server.js

import { createNewParty, getPartyList } from "$lib/features/party/party.service";
import { formDataToObject } from "$lib/utils/form.js";
import { serializeDoc } from "$lib/utils/serializer";
import { fail } from "@sveltejs/kit";

export async function load({ depends }) {
  depends('PARTY_UPDATED')
  let parties = await getPartyList();
  parties = serializeDoc(parties)
  return { listData: parties }
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
  }
};