export async function handle({ event, resolve }) {
  console.log('handle hooks');
  return await resolve(event);
}

export async function handleFetch({ request, fetch }) {
  console.log('handleFetch hooks');
  const url = new URL(request.url);
  if (url.pathname === '/') {
    return await fetch('/about/123');
  }
  return await fetch(request);
}

export async function handleError({ error }) {
  console.log('handleError hooks');
  console.log(error);
}
