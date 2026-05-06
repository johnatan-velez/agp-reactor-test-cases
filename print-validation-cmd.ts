import { resolve, join } from "node:path";
const agpDir = process.argv[2];
const dir = process.argv[3];
if (!agpDir || !dir) {
  console.error("Usage: bun run print-validation-cmd.ts <agp-dir> <module-dir>");
  process.exit(1);
}
const { MavenAdapter } = await import(join(resolve(agpDir), "src/ecosystem/maven/adapter.js"));
const resolvedDir = resolve(dir);
const adapter = new MavenAdapter();
const commands = await adapter.getValidationCommands(resolvedDir);
console.log("Module dir:          " + resolvedDir);
console.log("Validation command:  " + commands[0]);
