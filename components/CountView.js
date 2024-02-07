import { useEffect, useState } from 'react'

const CountView = ({ slug }) => {
  const [views, setViews] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const incrementView = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`, {
          method: 'PUT',
        })

        if (response.ok) {
          const data = await response.json()
          setViews(data.views)
        } else {
          console.error('Failed to increment view count. Status:', response.status)
        }
      } catch (error) {
        console.error('Error incrementing view count:', error)
      } finally {
        setLoading(false)
      }
    }

    incrementView()
  }, [slug])

  return <span>{loading ? 'Updating Views...' : `${views} Views`}</span>
}

export default CountView
