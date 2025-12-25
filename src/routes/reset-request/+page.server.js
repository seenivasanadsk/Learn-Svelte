import { getActiveResetRequest, upsertResetRequestService } from "$lib/features/auth/auth.service.js";
import { resetRequestSerializer } from "$lib/features/auth/resetRequest.model.js";
import { getAllUsernames } from "$lib/features/users/user.repository";
import { fail } from "@sveltejs/kit";

export async function load({ locals }) {
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
  resetRequest: async ({ request }) => {
    const formData = await request.formData();
    const action = formData.get('action');

    // 🟢 CREATE RESET REQUEST
    if (!action) {
      const username = formData.get('username');
      const result = await upsertResetRequestService(username);

      if (!result?.ok) {
        return fail(400, { message: result.message });
      }

      return result;
    }

    // 🟢 APPROVE RESET REQUEST
    if (action === 'approve') {
      const index = Number(formData.get('approverIndex'));

      const approver = {
        userId: formData.get('approverUserId'),
        username: formData.get('approverUsername'),
        approvedAt: new Date()
      };

      const result = await upsertResetRequestService(null, {
        approve: true,
        index,
        approver
      });

      if (!result?.ok) {
        return fail(400, { message: result.message });
      }

      return result;
    }
  }
};
