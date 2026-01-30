import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'REGENEXCALIBUR | Proof-of-Protection',
  description: 'The physical evolution of the blockchain. From Proof-of-Work to Proof-of-Protection.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
