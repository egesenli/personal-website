import { useState, useEffect } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = ({ navShow, onToggleNav }) => {
  useEffect(() => {
    if (navShow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [navShow])

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-full w-full transform backdrop-filter backdrop-blur-lg duration-300 ease-in-out ${
        navShow ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        type="button"
        className="absolute top-6 right-6 h-8 w-8 rounded"
        aria-label="Close Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <nav className="mt-8">
        {headerNavLinks.map((link) => (
          <div key={link.title} className="px-12 py-4">
            <Link
              href={link.href}
              className="p-3 text-xl font-medium text-black dark:text-gray-100 sm:p-4 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default MobileNav
