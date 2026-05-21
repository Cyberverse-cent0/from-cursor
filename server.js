/**
 * cPanel "Setup Node.js App" startup file.
 * cPanel sets PORT; Next.js reads it automatically via `next start`.
 */
const { spawn } = require("child_process");
const path = require("path");

const port = process.env.PORT || 3000;
const nextBin = path.join(__dirname, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "start", "-H", "0.0.0.0", "-p", String(port)], {
  cwd: __dirname,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: process.env.NODE_ENV || "production" },
});

child.on("exit", (code) => process.exit(code ?? 1));
