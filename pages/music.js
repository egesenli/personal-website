import React, { useState, useEffect } from 'react'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import AnimatedBars from '@/components/AnimatedBars'
import siteMetadata from '@/data/siteMetadata'
import Iframe from 'react-iframe'

export default function Music() {
  const [nowPlaying, setNowPlaying] = useState(null)
  const [topTracks, setTopTracks] = useState([])
  const [showAllTracks, setShowAllTracks] = useState(false)

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

    // const fetchTopTracks = async () => {
    //   try {
    //     const response = await fetch('/api/top-tracks')
    //     const data = await response.json()
    //     setTopTracks(data.tracks)
    //   } catch (error) {
    //     console.error('Error fetching Top Tracks: ', error)
    //   }
    // }

    const fetchTopPlaylist = async () => {
      try {
        const response = await fetch('/api/top-playlist')
        const data = await response.json()
        setTopTracks(data.tracks)
      } catch (error) {
        console.error('Error fetching Top Tracks: ', error)
      }
    }

    fetchNowPlaying()
    fetchTopPlaylist()
    // fetchTopTracks()

    // Refresh Now Playing every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)

    // Clear interval on component unmount
    return () => clearInterval(interval)
  }, [])

  const handleToggleTracks = () => {
    setShowAllTracks(!showAllTracks)
  }

  // Add this SVG component at the beginning of your file or import it from a separate file
  const ArrowIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  )

  const visibleTracks = showAllTracks ? topTracks : topTracks.slice(0, 5)

  return (
    <>
      <PageSEO title="Music" description={siteMetadata.description} />
      <div className="divide-y divide-gray-400">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Music
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Welcome to the sonic realm curated by me, a dedicated artist on a mission to craft
            unforgettable musical experiences, steering the journey through diverse genres and
            creating a harmonious atmosphere that resonates with the soul. Stay tuned!
          </p>
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
      </div>

      {visibleTracks.length > 0 && (
        <div className="container py-4">
          <div className="w-full max-w-5xl">
            <div className="flex w-full flex-row items-baseline border-b border-gray-200 pb-8 pt-6 dark:border-gray-800">
              <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
                Top Tracks
              </h1>
            </div>
            <ul>
              {visibleTracks.map((track, index) => (
                <div
                  key={index}
                  className="mt-3 flex w-full max-w-5xl flex-row items-baseline border-b border-gray-200 dark:border-gray-800"
                >
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-600">{index + 1}</p>
                  <div className="flex flex-col pl-3">
                    <a
                      className="w-60 truncate font-medium hover:text-green-400 dark:text-white sm:w-96 md:w-full"
                      href={track.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {track.title}
                    </a>
                    <p className="mb-4 w-60 truncate text-gray-500 dark:text-gray-400 sm:w-96 md:w-full">
                      {track.artist}
                    </p>
                  </div>
                </div>
              ))}
            </ul>
            {topTracks.length > 5 && (
              <button
                className="flex items-center font-medium text-primary-500 hover:text-primary-600 focus:outline-none dark:hover:text-primary-400"
                onClick={handleToggleTracks}
              >
                {showAllTracks ? (
                  <>
                    Show Less
                    <ArrowIcon className="h-4 w-4 rotate-180 transform" />
                  </>
                ) : (
                  <>
                    Show More
                    <ArrowIcon className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Sets and Selections
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Immerse yourself in the art of DJing with carefully curated sets and selections. Each mix
          is a testament to the skillful blending of tracks in various genres.
        </p>
      </div>
      <div className="container py-4">
        <div className="w-full">
          <div>
            <Iframe
              url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/744434260&color=%2344444c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              id="soundCloudEmbed"
              className="h-96 w-full"
              display="initial"
              position="relative"
              allow="autoplay"
              frameBorder="no"
              scrolling="no"
            />
          </div>
        </div>
      </div>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Join the Virtual Dance Floor
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Catch up on live mixes, and connect with fellow music enthusiasts who share a passion for
          rhythm and sound.
        </p>
      </div>

      <div className="container py-4">
        <div className="w-full">
          <div>
            <Iframe
              url="https://player.twitch.tv/?channel=senliofficial&parent=www.egesenli.com"
              id="twitchEmbed"
              className="h-96 w-full"
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
