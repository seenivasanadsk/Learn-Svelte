export function load({ params }) {
  console.log(params, import.meta.url);
  return { layout: 'data' };
}
