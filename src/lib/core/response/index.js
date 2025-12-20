// src\lib\core\response\index.js
export function commonError(message, status = 400) {
  return {
    success: false,
    status,
    message
  };
}
