import { commonError } from "$lib/core/response";
import { getUserByUsername } from "../users/user.repository"
import { resetRequestCreateModel } from "./resetRequest.model"
import { createResetRequest } from "./resetRequest.repository"

export async function createResetRequestService(username) {
  if (!username) {
    return commonError('Username is required', 400);
  }

  const user = await getUserByUsername(username)
  const resetRequest = resetRequestCreateModel(user)
  const result = await createResetRequest(resetRequest)

  if (!result.acknowledged) {
    return commonError('Reset Request not created')
  }

  return {
    success: true,
    message: 'Reset Request Created'
  };
}