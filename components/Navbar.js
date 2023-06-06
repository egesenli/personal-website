import React from 'react'
import Image from 'next/image'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'
import logoWhite from '/public/static/images/logo-white.png'
import logoBlack from '/public/static/images/logo-black.png'
import { useTheme } from 'next-themes'

const Navbar = () => {
  const { theme, resolvedTheme } = useTheme()

  return (
    <nav>
      <div className="flex items-center justify-between">
        <div className="flex items-center ml-4 mt-2">
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center">
              <div className="mr-3">
                <Image
                  src={theme === 'dark' || resolvedTheme === 'dark' ? logoWhite : logoBlack}
                  alt="Logo"
                  width={100}
                  height={75}
                />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="sm:flex hidden space-x-4">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2 mr-4">
          <MobileNav />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
