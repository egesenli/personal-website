// pages/api/views/[slug]/count.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const handler = async (req, res) => {
  const { slug } = req.query

  if (!slug) {
    return res.status(400).json({ error: 'Slug is required' })
  }

  try {
    console.log(`API route hit for fetching view count for slug: ${slug}`)

    const post = await prisma.post.findUnique({
      where: { slug: slug.toString() },
      select: { views: true },
    })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    console.log('Returning response with view count:', post.views)
    return res.status(200).json({ views: post.views })
  } catch (error) {
    console.error('Error in API route:', error)
    return res.status(500).json({ error: error.message || error.toString() })
  }
}

export default handler
