import { createResetRequestService } from "$lib/features/auth/resetRequest.service.js";
import { getAllUsernames } from "$lib/features/users/user.repository";
import { fail } from "@sveltejs/kit";

export async function load() {
  const activeUsers = await getAllUsernames()
  const users = activeUsers.map(u => u.username)
  return { users }
}

export const actions = {
  resetRequest: async ({ request }) => {
    const formData = await request.formData()
    const username = formData.get('username')
    const result = await createResetRequestService(username)
    console.log(result)

    // ❌ Expected error
    if (!result.success) {
      return fail(result.status, {
        message: result.message
      });
    }

    return result
  }
}