import { ShoppingCart } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <nav className="max-w-screen-2xl mx-auto px-8 py-4 flex items-center justify-between">
        <LocalizedClientLink href="/" className="text-2xl font-bold tracking-tight">
          EDISON
        </LocalizedClientLink>

        <div className="flex items-center gap-8">
          <LocalizedClientLink
            href="/"
            className="text-sm font-medium transition-colors hover:text-gray-600 text-gray-500"
          >
            Home
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-600 text-gray-500"
          >
            <ShoppingCart size={18} />
            Configure
          </LocalizedClientLink>
        </div>
      </nav>
    </header>
  )
}
