import { Command } from "commander";
import { ensureConfig } from "../core/config.js";
import { tunnelConfigExists, startTunnel, detectWireGuard } from "../platform/wireguard.js";
import { provisionTunnel } from "../provisioning/client.js";

export function startCommand() {
  return new Command("start")
    .description("Provision and start the StarGate encrypted tunnel")
    .action(async () => {
      try {
        await ensureConfig();
        const engine = await detectWireGuard();
        if (!engine.installed) {
          throw new Error("WireGuard is not installed. Install the official WireGuard client, then run `stargate doctor`.");
        }

        if (!(await tunnelConfigExists())) {
          console.log("No local tunnel profile found. Requesting automatic provisioning...");
          await provisionTunnel();
        }

        console.log("Starting WireGuard tunnel...");
        await startTunnel();
        console.log("StarGate tunnel start command completed.");
        console.log("Run `stargate status` to inspect the tunnel.");
        console.log("Note: full-tunnel routing and leak protection must be validated before treating this connection as fully protected.");
      } catch (error) {
        console.error(`Could not start StarGate: ${error.message}`);
        process.exitCode = 1;
      }
    });
}
