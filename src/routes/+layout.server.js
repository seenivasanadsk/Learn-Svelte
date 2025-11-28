export function load({ params }) {
  console.log(params, import.meta.url);
  // throw new Error();
  return { layout: 'data' };
}
