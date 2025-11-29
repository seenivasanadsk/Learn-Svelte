export function load({ fetch }) {
  const res = fetch('https://www.google.com');
  console.log(res);
}
