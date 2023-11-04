import React, { useState, useEffect } from 'react'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import AnimatedBars from '@/components/AnimatedBars'
import siteMetadata from '@/data/siteMetadata'
import Iframe from 'react-iframe'

export default function Music() {
  const [nowPlaying, setNowPlaying] = useState(null)
  const [topTracks, setTopTracks] = useState([])

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

    const fetchTopTracks = async () => {
      try {
        const response = await fetch('/api/top-tracks')
        const data = await response.json()
        setTopTracks(data.tracks)
      } catch (error) {
        console.error('Error fetching Top Tracks: ', error)
      }
    }

    fetchNowPlaying()
    fetchTopTracks()

    // Refresh Now Playing every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)

    // Clear interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <PageSEO title="Music" description={siteMetadata.description} />
      <div className="container px-5 py-12 mx-auto">
        <h1 className="title-3xl title-font-medium title-center title-font mb-4 text-black dark:text-white">
          Music Page
        </h1>
        <p className="title-font·text-xl·font-light·text-center·mb-4·text-black·dark:text-white">
          {siteMetadata.description}
        </p>
        {nowPlaying && nowPlaying.isPlaying ? (
          <div className="rounded-lg p-8 mt-6 bg-gray-500 dark:bg-gray-900 shadow-lg">
            <h2 className="text-xl font-medium text-white mb-1">Now Playing</h2>
            <div className="flex items-center space-x-2">
              <AnimatedBars />
              <div className="inline-flex max-w-[70%] items-center space-x-2 text-sm sm:max-w-[90%] sm:text-base">
                <a
                  className="inline-block truncate font-medium text-white hover:text-green-400"
                  href={nowPlaying.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {nowPlaying.title} - {nowPlaying.artist}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg p-8 mt-6 bg-gray-500 dark:bg-gray-900 shadow-lg">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500 mx-2"
                fill="none"
                viewBox="0 0 168 168"
              >
                <path
                  fill="#1ED760"
                  d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
                />
              </svg>
              <div className="sm:maxw-[90%] inline-flex max-w-[70%] items-center space-x-2 text-sm sm:text-base">
                <p className="font-medium dark:text-gray-200">Not Playing</p>
                <p className="text-500 dark:text-gray-300"> - Spotify</p>
              </div>
            </div>
          </div>
        )}

        {topTracks.length > 0 && (
          <div className="rounded-lg p-8 mt-6 bg-gray-500 dark:bg-gray-900 shadow-lg">
            <h2 className="text-xl font-medium text-white mb-4">Top Tracks</h2>
            <ul>
              {topTracks.map((track, index) => (
                <li key={index} className="text-white mb-2">
                  <a
                    className="text-white hover:text-green-400"
                    href={track.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {track.title} by {track.artist}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 space-y-6">
          <div>
            <Iframe
              url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/744434260&color=%2344444c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              id="soundCloudEmbed"
              className="w-full h-96"
              display="initial"
              position="relative"
              allow="autoplay"
              frameBorder="no"
              scrolling="no"
            />
          </div>

          <div>
            <Iframe
              url="https://player.twitch.tv/?channel=senliofficial&parent=localhost"
              id="twitchEmbed"
              className="w-full h-96"
              display="initial"
              position="relative"
              allowFullScreen={true}
              frameBorder="0"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </>
  )
}
