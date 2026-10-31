import { Command } from "commander";
import crypto from "node:crypto";
import { writeConfig, readConfig, DEFAULT_CONFIG } from "../core/config.js";

export function initCommand() {
  const command = new Command("init")
    .description("Initialize this device for StarGate")
    .action(async () => {
      try {
        const existing = await readConfig();
        if (existing) {
          console.log("StarGate is already initialized.");
          console.log(`Device ID: ${existing.deviceId}`);
          return;
        }

        const config = {
          ...DEFAULT_CONFIG,
          deviceId: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        };
        await writeConfig(config);
        console.log("✦ StarGate initialized.");
        console.log(`Device ID: ${config.deviceId}`);
        console.log("Next: configure the control-plane API, then run `stargate doctor`.");
        console.log("No tunnel has been started and no gateway has been provisioned yet.");
      } catch (error) {
        console.error(`Initialization failed: ${error.message}`);
        process.exitCode = 1;
      }
    });
  return command;
}
