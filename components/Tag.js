import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 rounded-md border border-primary-500 px-2 py-1 text-sm font-medium uppercase text-primary-500 transition-colors hover:bg-primary-500 hover:text-white dark:hover:bg-primary-400 dark:hover:text-black">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
