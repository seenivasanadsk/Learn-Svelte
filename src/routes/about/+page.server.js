import { TEST } from '$env/static/private';
export async function load() {
  console.log("server: page.server.js load");
  return { message: "Runs in server", TEST };
}