// src\routes\(protected)\party\+page.server.js

import { getPartyList } from "$lib/features/party/party.service";
import { serializeDoc } from "$lib/utils/serializer";

export async function load({ depends }) {
  depends('PARTY_UPDATED')
  let parties = await getPartyList();
  parties = serializeDoc(parties)
  return { listData: parties }
}