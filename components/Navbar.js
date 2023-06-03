import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const Navbar = () => (
  <nav className="hidden sm:block">
    {headerNavLinks.map((link) => (
      <Link
        key={link.title}
        href={link.href}
        className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
      >
        {link.title}
      </Link>
    ))}
  </nav>
)

export default Navbar
