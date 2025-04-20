import { spawn } from "bun";
import { watch } from "fs";

let proc: Bun.Process | null = null;

const start = () => {
  if (proc) proc.kill();
  console.clear();
  console.log("🚀 Ejecutando index.ts...\n");

  proc = spawn(["bun", "run", "index.ts"], {
    stdout: "inherit",
    stderr: "inherit"
  });
};

watch("/", { recursive: true }, (event, filename) => {
  if (filename.endsWith(".ts")) {
    start();
  }
});

start();
