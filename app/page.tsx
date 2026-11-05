"use client"

import { useState } from "react"

const commands = [
  ["stargate init", "Initialize your local device and gateway profile."],
  ["stargate connect", "Establish a full-tunnel encrypted connection."],
  ["stargate status", "Inspect tunnel, DNS, and gateway health."],
  ["stargate devices", "Manage authorized devices and public keys."],
]

export default function Home() {
  const [copied, setCopied] = useState(false)
  const [activeCommand, setActiveCommand] = useState("stargate connect")
  const copyInstall = async () => { await navigator.clipboard?.writeText("npm install -g stargate-cli"); setCopied(true); setTimeout(() => setCopied(false), 1600) }
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top"><span className="brand-mark">✦</span><span>STARGATE</span><small>CLI</small></a>
        <div className="nav-links"><a href="#how">How it works</a><a href="#commands">Commands</a><a href="#security">Security</a><a href="#docs">Docs ↗</a></div>
        <a className="nav-button" href="https://github.com/nastylex/StarGate">View on GitHub <span>↗</span></a>
      </nav>

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" /> OPEN SOURCE · EARLY DEVELOPMENT</p>
          <h1>Your network.<br /><em>Your gateway.</em><br />Your security.</h1>
          <p className="lede">Secure connectivity, one command away. StarGate creates an encrypted tunnel between your device and a gateway you control — across Wi-Fi, mobile data, and everything in between.</p>
          <div className="hero-actions"><button className="primary" onClick={copyInstall}>{copied ? "Copied to clipboard" : "Install StarGate"} <span>→</span></button><a className="text-link" href="#how">Explore the architecture <span>↓</span></a></div>
        </div>
        <div className="terminal-card" aria-label="StarGate terminal preview">
          <div className="terminal-top"><div className="dots"><i /><i /><i /></div><span>terminal — stargate</span><span className="terminal-status"><b /> LIVE</span></div>
          <div className="terminal-body"><p className="muted">~ % <span>stargate status</span></p><p className="dim">✦ STARGATE STATUS</p><p>Initialized: <strong>yes</strong></p><p>Device ID: <span className="cyan">sg_dev_7f2a91</span></p><p>WireGuard installed: <strong>yes</strong></p><p>Tunnel profile: <strong>present</strong></p><p>Tunnel active: <span className="green">yes · protected</span></p><p className="divider" /><p className="muted">~ % <span className="cursor">stargate connect</span></p><div className="terminal-footer"><span><b className="green-dot" /> tunnel handshake verified</span><span>42 ms</span></div></div>
        </div>
      </section>

      <section className="signal-row shell"><div><strong>01</strong><span>PRIVATE BY DESIGN</span></div><div><strong>02</strong><span>WIREGUARD ENGINE</span></div><div><strong>03</strong><span>ONE COMMAND UX</span></div><div><strong>04</strong><span>OPEN SOURCE</span></div></section>

      <section id="how" className="section shell"><div className="section-intro"><p className="eyebrow">THE SIMPLE PATH</p><h2>Complex under the hood.<br /><em>Clear at the surface.</em></h2><p>StarGate handles the hard parts of secure networking so you can focus on the work that matters.</p></div><div className="steps"><article><span>01</span><h3>Initialize</h3><p>Register your device and establish a trusted relationship with your gateway.</p><code>stargate init</code></article><article><span>02</span><h3>Connect</h3><p>Provision a WireGuard peer, validate the route, and bring up a protected tunnel.</p><code>stargate connect</code></article><article><span>03</span><h3>Stay protected</h3><p>Monitor handshakes, reconnect when networks change, and block unsafe fallbacks.</p><code>stargate status</code></article></div></section>

      <section id="security" className="security-band"><div className="shell security-content"><div><p className="eyebrow">BUILT ON TRUST</p><h2>Security isn&apos;t<br /><em>a feature.</em></h2></div><p>StarGate never invents cryptography. It relies on battle-tested implementations, client-owned keys, and a full-tunnel acceptance model that verifies DNS, routes, handshakes, and kill-switch behavior before calling a connection protected.</p></div></section>

      <section id="commands" className="section shell commands-section"><div className="section-intro"><p className="eyebrow">COMMAND SURFACE</p><h2>Everything you need.<br /><em>Nothing you don&apos;t.</em></h2></div><div className="command-grid"><div className="command-list">{commands.map(([cmd, desc]) => <button key={cmd} className={activeCommand === cmd ? "command active" : "command"} onClick={() => setActiveCommand(cmd)}><span>{cmd}</span><small>{desc}</small><b>→</b></button>)}</div><div className="command-detail"><span className="detail-label">SELECTED COMMAND</span><h3>{activeCommand}</h3><p>{commands.find(([cmd]) => cmd === activeCommand)?.[1]}</p><div className="detail-line"><span>STATUS</span><strong>READY TO RUN</strong></div><div className="detail-line"><span>REQUIRES</span><strong>NODE 20+ · ROOT</strong></div></div></div></section>

      <footer id="docs" className="footer shell"><div className="brand"><span className="brand-mark">✦</span><span>STARGATE</span><small>CLI</small></div><p>Secure connectivity, one command away.</p><div className="footer-links"><a href="#security">Security</a><a href="https://github.com/nastylex/StarGate">GitHub ↗</a><a href="mailto:hello@stargate.dev">Contact</a></div><small className="copyright">© 2026 AirSPACEx · Built for the open internet.</small></footer>
    </main>
  )
}
