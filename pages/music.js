import React, { useState, useEffect } from 'react'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
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
        {nowPlaying && (
          <div className="rounded-lg p-8 mt-6 bg-gray-500 dark:bg-gray-900 shadow-lg">
            <h2 className="text-xl font-medium text-white mb-1">Now Playing</h2>
            <p className="text-white">
              {nowPlaying.title} by {nowPlaying.artist}
            </p>
            <p className="mt-2 text-blue-300">
              <a href={nowPlaying.songUrl} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
            </p>
          </div>
        )}

        {topTracks.length > 0 && (
          <div className="rounded-lg p-8 mt-6 bg-gray-500 dark:bg-gray-900 shadow-lg">
            <h2 className="text-xl font-medium text-white mb-4">Top Tracks</h2>
            <ul>
              {topTracks.map((track, index) => (
                <li key={index} className="text-white mb-2">
                  {track.title} by {track.artist}
                  <a href={track.songUrl} target="_blank" rel="noopener noreferrer">
                    Listen on Spotify
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-6">
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
