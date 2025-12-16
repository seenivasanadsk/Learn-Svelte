// commands/server.js
import path from "node:path";
import spawn from "cross-spawn";
import formatText from "./helpers/formatText.js";

export const info = "Manage SvelteKit server using PM2 (adapter-node)";

function log(msg, color = "white") {
  console.log(formatText(msg, { color }));
}

const projectRoot = path.resolve(import.meta.dirname, "..");
const PM2_NAME = "sveltekit-app";
const PORT = process.env.PRODUCTION_PORT || 3333;
const HOST = "0.0.0.0";

const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";

/* -----------------------------
   Safe runner
------------------------------ */
function run(cmd, args = [], { inherit = true } = {}) {
  const res = spawn.sync(cmd, args, {
    cwd: projectRoot,
    shell: true,
    encoding: "utf-8",
    stdio: inherit ? "inherit" : "pipe",
  });

  if (res.error) throw res.error;
  if (!inherit && res.stdout) console.log(res.stdout.trim());
  if (!inherit && res.stderr) console.error(res.stderr.trim());
}

/* -----------------------------
   BUILD
------------------------------ */
export function build() {
  log("🏗️ Building SvelteKit (adapter-node)...", "cyan");
  run("npm", ["run", "build"]);
  log("✅ Build completed", "green");
}

/* -----------------------------
   START (FIXED)
------------------------------ */
export function start() {
  log("🚀 Starting SvelteKit server (PM2)...", "cyan");

  run(npxCmd, [
    "pm2",
    "start",
    "build/index.js",
    "--name",
    PM2_NAME,
    "--env",
    "production",
  ], {
    inherit: true
  });

  // set env vars explicitly
  run(npxCmd, [
    "pm2",
    "set",
    `${PM2_NAME}:PORT`,
    PORT
  ]);

  run(npxCmd, [
    "pm2",
    "set",
    `${PM2_NAME}:HOST`,
    HOST
  ]);

  log(`✅ Server running at http://localhost:${PORT}`, "green");
}

/* -----------------------------
   STOP
------------------------------ */
export function stop() {
  log("🛑 Stopping server...", "cyan");
  run(npxCmd, ["pm2", "stop", PM2_NAME]);
  run(npxCmd, ["pm2", "delete", PM2_NAME]);
  log("✅ Server stopped", "green");
}

/* -----------------------------
   STATUS
------------------------------ */
export function status() {
  log("📊 Server status:", "cyan");
  run(npxCmd, ["pm2", "status", PM2_NAME], { inherit: false });
}

/* -----------------------------
   LOGS
------------------------------ */
export function logs() {
  log("📜 Server logs:", "cyan");
  run(npxCmd, ["pm2", "logs", PM2_NAME, "--lines", "100"], { inherit: false });
}
