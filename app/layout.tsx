import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "StarGate — Secure connectivity, one command away",
  description: "Encrypted network connectivity for every device and every network.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
