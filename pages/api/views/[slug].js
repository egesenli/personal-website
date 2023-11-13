// pages/api/views/[slug].js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const handler = async (req, res) => {
  const { slug } = req.query

  if (!slug) {
    return res.status(400).json({ error: 'Slug is required' })
  }

  try {
    console.log(`API route hit for slug: ${slug}`)

    const updatedPost = await prisma.post.update({
      where: { slug: slug.toString() },
      data: { views: { increment: 1 } },
      select: { views: true },
    })

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' })
    }

    console.log('Returning response with updated view count:', updatedPost.views)
    return res.status(200).json({ views: updatedPost.views })
  } catch (error) {
    console.error('Error in API route:', error)
    return res.status(500).json({ error: error.message || error.toString() })
  }
}

export default handler
