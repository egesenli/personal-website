import { useEffect, useState } from 'react'

const DisplayViewCount = ({ slug }) => {
  const [views, setViews] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await fetch(`/api/views/${slug}/count`, {
          method: 'GET',
        })

        if (response.ok) {
          const data = await response.json()
          setViews(data.views)
        } else {
          console.error('Failed to fetch view count. Status:', response.status)
        }
      } catch (error) {
        console.error('Error fetching view count:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchViewCount()
  }, [slug])

  return <span>{loading ? 'Loading...' : `${views} Views`}</span>
}

export default DisplayViewCount
