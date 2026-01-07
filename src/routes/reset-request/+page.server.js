import { emit } from '$lib/core/server/sseBus.js';
import {
  approveResetRequestService,
  cancelResetRequestService,
  changePasswordByResetRequest,
  createResetRequestService,
  getActiveResetRequest
} from '$lib/features/auth/auth.service.js';
import { resetRequestSerializer } from '$lib/features/auth/resetRequest.model.js';
import { getAllUsernames } from '$lib/features/users/user.repository';
import { serializeDoc } from '$lib/utils/serializer.js';
import { fail } from '@sveltejs/kit';

export async function load({ locals, depends }) {
  depends('RESET_REQUEST_UPDATED');

  const currentUser = locals?.user;

  let resetRequest = await getActiveResetRequest();
  resetRequest = resetRequestSerializer(resetRequest);

  const activeUsers = await getAllUsernames();
  const users = activeUsers.map((u) => u.username);

  let approverCount = users.filter((u) => u !== resetRequest?.username).length;
  approverCount = approverCount >= 2 ? 2 : 1;

  return { users, resetRequest, currentUser, approverCount };
}

function syncSSE() {
  emit({ type: 'RESET_REQUEST_UPDATED' });
}

export const actions = {
  resetRequest: async ({ request, locals }) => {
    const currentUser = locals?.user;

    const formData = await request.formData();
    const status = formData.get('status');
    const cancelRequest = formData.get('cancelRequest');

    if (cancelRequest === 'YES') {
      const result = await cancelResetRequestService(currentUser);

      if (!result?.ok) {
        return fail(400, { message: result.message });
      }

      syncSSE()
      return serializeDoc(result);
    }

    // INIT status makes NEW
    if (status === 'INIT') {
      const username = formData.get('username');
      const result = await createResetRequestService(username);

      if (!result?.ok) {
        return fail(400, { message: result.message });
      }

      syncSSE()
      return serializeDoc(result);
    }

    if (status === 'NEW' || status === 'WAITING') {
      const index = Number(formData.get('approvingIndex'));
      const result = await approveResetRequestService(currentUser, 'WAITING', index);

      if (!result?.ok) {
        return fail(400, { message: result.message });
      }

      syncSSE()
      return serializeDoc(result);
    }

    if (status === 'APPROVED') {
      const newPassword = formData.get('newPassword');
      const confirmPassword = formData.get('confirmPassword');
      const result = await changePasswordByResetRequest(newPassword, confirmPassword, currentUser);

      if (!result?.ok) {
        return fail(400, { message: result.message });
      }

      syncSSE()
      return serializeDoc(result);
    }
  }
};
