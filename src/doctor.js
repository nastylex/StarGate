import { Command } from "commander";
import { readConfig } from "../core/config.js";
import { detectWireGuard, tunnelConfigExists } from "../platform/wireguard.js";

export function doctorCommand() {
  return new Command("doctor")
    .description("Check local StarGate prerequisites")
    .action(async () => {
      const config = await readConfig();
      const engine = await detectWireGuard();
      const profile = await tunnelConfigExists();

      const checks = [
        ["Node.js >= 20", Number(process.versions.node.split(".")[0]) >= 20],
        ["StarGate initialized", Boolean(config)],
        ["WireGuard installed", engine.installed],
        ["Tunnel profile available", profile]
      ];

      console.log("✦ STARGATE DIAGNOSTICS");
      for (const [label, passed] of checks) {
        console.log(`${passed ? "✓" : "!"} ${label}`);
      }

      if (!config) console.log("Run `stargate init`.");
      if (!engine.installed) console.log("Install WireGuard from https://www.wireguard.com/install/.");
      if (!profile) console.log("A tunnel profile will be created by the StarGate provisioning service when available.");
      if (checks.every(([, passed]) => passed)) console.log("Local prerequisites look good.");
    });
}
