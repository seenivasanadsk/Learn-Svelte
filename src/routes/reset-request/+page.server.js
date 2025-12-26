import { approveResetRequestService, createResetRequestService, getActiveResetRequest } from "$lib/features/auth/auth.service.js";
import { resetRequestSerializer } from "$lib/features/auth/resetRequest.model.js";
import { getAllUsernames } from "$lib/features/users/user.repository";
import { fail } from "@sveltejs/kit";

export async function load({ locals, depends }) {
  depends('reset-request:data');

  const currentUser = locals?.user;

  let resetRequest = await getActiveResetRequest();
  resetRequest = resetRequestSerializer(resetRequest);

  const activeUsers = await getAllUsernames();
  const users = activeUsers.map(u => u.username);

  let approverCount = users.filter(u => u !== resetRequest?.username).length;
  approverCount = approverCount >= 2 ? 2 : 1;

  return { users, resetRequest, currentUser, approverCount };
}

export const actions = {
  resetRequest: async ({ request, locals }) => {
    const currentUser = locals?.user;

    const formData = await request.formData();
    const status = formData.get('status');

    // INIT status makes NEW
    if (status === 'INIT') {
      const username = formData.get('username');
      const result = await createResetRequestService(username);

      if (!result?.ok) {
        return fail(400, { message: result.message });
      }

      return result;
    }

    if (status === 'NEW') {
      const index = Number(formData.get('approvingIndex'));
      const approver = { id: currentUser?.id, username: currentUser?.username, approvedAt: new Date() }
      const result = approveResetRequestService(approver, 'WAITING', index)

      if (!result?.ok) {
        return fail(400, { message: result.message });
      }

      return result;
    }
  }
};
