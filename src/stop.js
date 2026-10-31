import { Command } from "commander";
import { stopTunnel } from "../platform/wireguard.js";

export function stopCommand() {
  return new Command("stop")
    .description("Stop the StarGate WireGuard tunnel")
    .action(async () => {
      try {
        await stopTunnel();
        console.log("StarGate tunnel stop command completed.");
      } catch (error) {
        console.error(`Could not stop StarGate: ${error.message}`);
        process.exitCode = 1;
      }
    });
}
