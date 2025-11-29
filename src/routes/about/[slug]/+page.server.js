export async function load() {
  await new Promise((fulfil) => {
    setTimeout(fulfil, 3000);
  });
}