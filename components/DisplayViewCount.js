// components/DisplayViewCount.js
import { useEffect, useState } from 'react'

const DisplayViewCount = ({ slug }) => {
  const [views, setViews] = useState(0)

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        console.log('Fetching view count for slug:', slug)

        // Fetch call to get the view count without incrementing
        const response = await fetch(`/api/views/${slug}/count`, {
          method: 'GET',
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Received view count data:', data)
          setViews(data.views)
        } else {
          console.error('Failed to fetch view count')
        }
      } catch (error) {
        console.error('Error fetching view count:', error)
      }
    }

    fetchViewCount()
  }, [slug])

  return <span>{views} Views</span>
}

export default DisplayViewCount
