import React from 'react'
import Image from 'next/image'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import ThemeSwitch from './ThemeSwitch'
import logoWhite from '/public/static/images/logo-white.png'
import logoBlack from '/public/static/images/logo-black.png'
import { useTheme } from 'next-themes'

const Navbar = ({ onToggleNav }) => {
  const { theme, resolvedTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 backdrop-filter backdrop-blur-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
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
        <div className="hidden md:flex items-center justify-center mt-2">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="p-1 font-medium text-black dark:text-gray-100 sm:p-4"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4 mt-2 mr-4">
          <button
            type="button"
            className="ml-1 mr-1 h-8 w-8 rounded py-1 md:hidden"
            aria-label="Toggle Menu"
            onClick={onToggleNav} // Add this line to trigger the MobileNav menu
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex items-center mt-2">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
