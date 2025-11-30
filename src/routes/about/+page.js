export async function load({ data }) {
  console.log(data)
  console.log("client: page.js load");
  return { message: "Runs in Client" };
}
