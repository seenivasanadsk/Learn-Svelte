import { json } from "@sveltejs/kit";

export function GET(para) {
  console.log(Object.keys(para))
  console.log("getClientAddress", para.getClientAddress())
  // console.log("request", para.request)
  console.log("locals", para.locals)
  console.log("platform", para.platform)
  console.log("route", para.route)
  console.log("url", para.url)
  console.log("tracing", para.tracing)
  return json(5)
}