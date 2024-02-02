import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import DisplayViewCount from '@/components/DisplayViewCount'
import NewsletterForm from '@/components/NewsletterForm'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import Introduction from '@/components/Introduction'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import AnimatedBars from '@/components/AnimatedBars' // Import the AnimatedBars component from the Music page
import { useEffect } from 'react' // Import useEffect hook

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const [searchValue, setSearchValue] = useState('')
  const initialDisplayPosts = posts.slice(0, MAX_DISPLAY)
  const filteredPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredPosts

  // Now Playing State and Fetching Logic
  const [nowPlaying, setNowPlaying] = useState(null)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/now-playing')
        const data = await response.json()
        setNowPlaying(data)
      } catch (error) {
        console.error('Error fetching Now Playing: ', error)
      }
    }

    fetchNowPlaying()

    // Refresh Now Playing every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)

    // Clear interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="mx-auto max-w-6xl">
        <div className="divide-y divide-gray-400">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <Introduction />
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Projects
            </h1>
          </div>
          <div className="container py-12">
            <div className="-m-4 flex flex-wrap">
              {projectsData.map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc}
                  href={d.href}
                  github={d.github}
                  tech1={d.tech1}
                  tech2={d.tech2}
                  tech3={d.tech3}
                />
              ))}
            </div>
            <div className="flex py-4 text-base font-medium leading-6">
              <Link
                href="/projects"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="All projects"
              >
                All Projects &rarr;
              </Link>
            </div>
          </div>
          {/* Use the SearchBar component here */}
        </div>
        <div className="divide-y divide-gray-400">
          <h1 className="space-y-2 pb-8 pt-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:space-y-5 md:text-6xl md:leading-14">
            Latest
          </h1>
          <ul>
            {!posts.length && 'No posts found.'}
            {displayPosts.map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <Link href={`/blog/${slug}`} key={slug}>
                  <li key={slug} className="py-6">
                    <article className="space-y-2 rounded-xl border-2 border-transparent bg-transparent bg-opacity-20 p-4 transition duration-500 hover:border-primary-500 hover:bg-gray-200 dark:border-transparent dark:hover:border-primary-500 dark:hover:bg-gray-800 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-3">
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-1">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <div className="xl:col-span-1">
                                <dl>
                                  <dd className="text-sm font-normal leading-6 text-gray-500 dark:text-gray-400">
                                    <time dateTime={date}>{formatDate(date)}</time>
                                    {' • '}
                                    <DisplayViewCount className="mx-1" slug={slug} />
                                  </dd>
                                </dl>
                              </div>
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500"
                              >
                                {title}
                              </Link>
                            </h2>
                          </div>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                          <div className="prose max-w-none pt-5 text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="flex pl-4 text-base font-medium leading-6">
        <Link
          href="/blog"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="All posts"
        >
          All Posts &rarr;
        </Link>
      </div>
      <div className="container py-4">
        <div className="-m-4 flex flex-wrap">
          {nowPlaying && nowPlaying.isPlaying ? (
            <div className="w-full p-4">
              <div className="rounded-lg bg-gray-500 p-8 shadow-lg dark:bg-gray-900">
                <h2 className="mb-1 text-xl font-medium text-white">Now Playing</h2>
                <div className="flex items-center space-x-2">
                  <AnimatedBars />
                  <div className="inline-flex w-full items-center space-x-2 text-sm sm:w-4/6 sm:text-base md:w-4/5">
                    <a
                      className="font-medium text-white hover:text-green-400"
                      href={nowPlaying.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {nowPlaying.title} - {nowPlaying.artist}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full p-4">
              <div className="rounded-lg bg-gray-500 p-8 shadow-lg dark:bg-gray-900">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-2 h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 168 168"
                  >
                    <path
                      fill="#1ED760"
                      d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
                    />
                  </svg>
                  <div className="inline-flex w-full items-center space-x-2 text-sm sm:w-4/6 sm:text-base md:w-4/5">
                    <p className="font-medium text-gray-200">Not Playing</p>
                    <p className="text-500 text-gray-300"> - Spotify</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
