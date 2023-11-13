import { useEffect, useState } from 'react'

const CountView = ({ slug }) => {
  console.log('CountView component rendering for slug:', slug)

  const [views, setViews] = useState(0)

  useEffect(() => {
    console.log('Effect is running for slug:', slug)

    const incrementView = async () => {
      try {
        console.log('Fetching view count for slug:', slug)

        // Assuming a fetch call to update the view count
        const response = await fetch(`/api/views/${slug}`, {
          method: 'PUT',
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Received view count data:', data)
          setViews(data.views)
        } else {
          console.error('Failed to increment view count')
        }
      } catch (error) {
        console.error('Error incrementing view count:', error)
      }
    }

    incrementView()
  }, [slug])

  console.log('Rendering CountView component for slug:', slug)
  return <span>{views} Views</span>
}

export default CountView
