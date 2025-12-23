import { fail } from "@sveltejs/kit";

// Convert stack string to array of frames
function parseStack(stack) {
  if (!stack) return [];
  // Each line after the first line is a frame
  return stack
    .split("\n")
    .slice(1)
    .map(line => line.trim());
}


// utils/errors.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
}

// Common error response
export const commonError = (error, includeStack = true) => {
  if (error instanceof AppError) {
    return fail(error.status, {
      message: error.message
    });
  }

  // fallback for unexpected errors
  return {
    success: false,
    message: error instanceof Error ? error.message : String(error),
    status: 500,
    ...(includeStack && error instanceof Error && { stack: parseStack(error.stack) }),
  };
};