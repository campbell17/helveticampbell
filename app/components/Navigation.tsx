'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const textStyles = 'font-helveticampbell font-[900] tracking-normal text-xl nav-link'

  return (
    <div className="flex flex-col gap-2 mb-6 flex-1">
      <Link href="/" className={`${textStyles} ${pathname === "/" ? 'active' : ''}`}>
        About
      </Link>
      <Link href="/work" className={`${textStyles} ${pathname === "/work" ? 'active' : ''}`}>
        Work
      </Link>
      <Link href="/writing" className={`${textStyles} ${pathname === "/writing" ? 'active' : ''}`}>
        Writing
      </Link>
    </div>
  )
} 