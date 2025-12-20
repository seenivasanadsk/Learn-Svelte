// Get cookie value by name
export function getCookie(name) {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

// Set cookie with 1 year expiration, root path
export function setCookie(name, value) {
  const oneYear = 365 * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${oneYear}; path=/`;
}

// Delete cookie
export function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; max-age=0; path=/`;
}
