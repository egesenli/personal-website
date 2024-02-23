import { useState, useEffect } from 'react'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

function LinkCard({ href, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-3 flex w-full max-w-3xl items-center rounded-md bg-gray-100 p-1 transition-all hover:scale-105"
    >
      <div className="flex w-full text-center">
        <div className="h-10 w-10">
          {/* Image component or any other UI element for the link */}
        </div>
        <h2 className="-ml-10 flex w-full items-center justify-center font-semibold text-gray-700">
          {title}
        </h2>
      </div>
    </a>
  )
}

export default function LinksPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        // Use the data from siteMetadata instead of calling fetchData()
        const result = {
          name: siteMetadata.author,
          avatar: siteMetadata.siteLogo,
          links: [
            { href: siteMetadata.twitter, title: 'Twitter' },
            { href: siteMetadata.github, title: 'GitHub' },
            // Add more link objects as needed
          ],
          socials: [
            { href: siteMetadata.twitter, title: 'Twitter' },
            { href: siteMetadata.github, title: 'GitHub' },
            // Add more social objects as needed
          ],
        }

        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDataAsync()
  }, [])

  if (!data) {
    return null // or a loading indicator
  }

  return (
    <div className="mx-auto mt-16 flex w-full flex-col items-center justify-center px-8">
      <Image priority alt={data.name} src={data.avatar} width={100} height={75} />
      <h1 className="mb-8 mt-4 text-xl font-bold text-white">{data.name}</h1>
      {data.links.map((link) => (
        <LinkCard key={link.href} {...link} />
      ))}
      <div className="flex flex-row justify-between">
        {data.socials.map((social) => (
          <div className="mx-1.5" key={social.href}>
            <SocialIcon kind="github" href={social.href} size="6" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Indicate that this page should not use the layout
LinksPage.noLayout = true
