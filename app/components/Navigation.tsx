'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2 mb-6 flex-1">
      <Link href="/" className={pathname === "/" ? 'nav-link active' : 'nav-link'}>
        About
      </Link>
      <Link href="/work" className={pathname === "/work" ? 'nav-link active' : 'nav-link'}>
        Work
      </Link>
      <Link href="/writing" className={pathname === "/writing" ? 'nav-link active' : 'nav-link'}>
        Writing
      </Link>
    </div>
  )
} 