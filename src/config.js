import { Command } from "commander";
import { ensureConfig, writeConfig } from "../core/config.js";

export function configCommand() {
  const command = new Command("config").description("Inspect or update local StarGate settings");

  command
    .command("show")
    .description("Show non-secret configuration")
    .action(async () => {
      const config = await ensureConfig();
      console.log(JSON.stringify(config, null, 2));
    });

  command
    .command("set <key> <value>")
    .description("Set a supported configuration value")
    .action(async (key, value) => {
      const allowed = new Set(["apiUrl", "gatewayMode", "routingMode"]);
      if (!allowed.has(key)) {
        console.error(`Unsupported setting: ${key}`);
        process.exitCode = 1;
        return;
      }
      const config = await ensureConfig();
      if (key === "gatewayMode" && !["cloud", "private", "hybrid"].includes(value)) {
        throw new Error("gatewayMode must be cloud, private, or hybrid.");
      }
      if (key === "routingMode" && value !== "full") {
        throw new Error("This initial StarGate build only targets full-tunnel routing.");
      }
      if (key === "apiUrl" && !/^https:\/\//.test(value)) {
        throw new Error("apiUrl must use HTTPS.");
      }
      config[key] = value;
      await writeConfig(config);
      console.log(`Updated ${key}.`);
    });

  return command;
}
