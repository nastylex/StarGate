# StarGate Architecture Notes

## Control plane

The control plane authenticates users and devices, chooses gateways, assigns tunnel addresses, and coordinates WireGuard peer provisioning. It must not proxy ordinary user traffic.

## Data plane

WireGuard gateways terminate encrypted tunnels and forward authorized traffic. Cloud and privately hosted gateways should expose the same authenticated management interface to the control plane.

## Key ownership

The client generates its own WireGuard private key. Only the public key is registered with StarGate. The private key remains on the device and is stored with restrictive permissions or an OS credential store.

## Provisioning lifecycle

1. Authenticate account.
2. Generate or load local device key pair.
3. Register device public key.
4. Select a healthy gateway according to policy.
5. Allocate a tunnel address.
6. Provision the public key as a gateway peer.
7. Return gateway public key, endpoint, allowed IPs, DNS and assigned address.
8. Client validates and writes configuration locally.
9. Client starts WireGuard and verifies route, DNS and public-IP behaviour.

## Full-tunnel acceptance criteria

A tunnel is not considered fully protected until:
- IPv4 default route traverses the tunnel.
- IPv6 is either routed through the tunnel or safely blocked.
- DNS uses the intended resolver and does not leak to the physical network.
- Traffic is blocked or safely handled when the tunnel drops.
- The client validates the expected gateway peer and handshake.
- Disconnect behaviour is explicit and does not leave unintended routes or firewall rules.
