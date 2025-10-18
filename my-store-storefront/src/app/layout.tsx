import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import Script from "next/script"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
