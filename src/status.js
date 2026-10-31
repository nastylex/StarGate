import { Command } from "commander";
import { readConfig } from "../core/config.js";
import { detectWireGuard, getTunnelStatus, tunnelConfigExists } from "../platform/wireguard.js";

export function statusCommand() {
  return new Command("status")
    .description("Show StarGate configuration and tunnel status")
    .action(async () => {
      const config = await readConfig();
      const engine = await detectWireGuard();
      const tunnel = await getTunnelStatus();

      console.log("✦ STARGATE STATUS");
      console.log(`Initialized: ${config ? "yes" : "no"}`);
      console.log(`Device ID: ${config?.deviceId || "not registered"}`);
      console.log(`WireGuard installed: ${engine.installed ? "yes" : "no"}`);
      console.log(`Tunnel profile: ${(await tunnelConfigExists()) ? "present" : "missing"}`);
      console.log(`Tunnel active: ${tunnel.active ? "yes" : "no"}`);
      if (tunnel.detail) console.log(`Details: ${tunnel.detail}`);
    });
}
