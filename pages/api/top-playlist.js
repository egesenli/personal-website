import { getTopPlaylist } from '../../lib/spotify'

const getTopPlaylistData = async (_, res) => {
  try {
    const response = await getTopPlaylist()
    const data = await response.json()

    console.log(data)

    const { tracks } = data // Extract tracks from the 'data' object

    if (!tracks || !tracks.items) {
      return res.status(200).json({ tracks: [] })
    }

    const playlistTracks = tracks.items.slice(0, 10).map((item) => {
      const track = item.track

      return {
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name,
      }
    })

    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

    return res.status(200).json({ tracks: playlistTracks })
  } catch (error) {
    console.error('Error fetching Spotify data:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getTopPlaylistData
