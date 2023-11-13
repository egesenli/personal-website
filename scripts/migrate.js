const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const migrateData = async () => {
  const blogPath = path.join(__dirname, '..', 'data', 'blog')

  const files = fs.readdirSync(blogPath)

  for (const file of files) {
    const filePath = path.join(blogPath, file)

    // Check if it's a file
    const isFile = fs.statSync(filePath).isFile()

    if (!isFile) {
      console.warn(`Skipped directory: ${filePath}`)
      continue
    }

    const content = fs.readFileSync(filePath, 'utf8')
    const { data, content: body } = matter(content)

    try {
      await prisma.post.create({
        data: {
          title: data.title || 'Untitled',
          date: new Date(data.date),
          lastmod: data.lastmod ? new Date(data.lastmod) : null,
          tags: { set: data.tags || [] },
          draft: data.draft || false,
          summary: data.summary || '',
          images: null,
          authors: { set: data.authors || [] },
          layout: data.layout || '',
          canonicalUrl: data.canonicalUrl || '',
          content: body, // Use the entire content (including frontmatter and body)
          slug: path.parse(file).name || 'Untitled',
        },
      })

      console.log(`Post "${path.parse(file).name}" migrated successfully.`)
    } catch (error) {
      console.error(`Error migrating post "${path.parse(file).name}":`, error)
    }
  }

  await prisma.$disconnect()
}

migrateData()
