import { getTopTracks } from '../../lib/spotify'

const getTopTracksData = async (_, res) => {
  const response = await getTopTracks()
  const data = await response.json()

  console.log(data)

  const { items } = data

  if (!items) {
    return res.status(200).json({ tracks: [] })
  }

  const tracks = items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }))

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

  return res.status(200).json({ tracks })
}

export default getTopTracksData
