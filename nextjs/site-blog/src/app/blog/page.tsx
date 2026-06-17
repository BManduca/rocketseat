import { allPosts } from 'contentlayer/generated'
import { BlogList } from '@/templates/blog'

export default function BlogListPage() {
  // esta acontecendo no servidor de maneira exclusiva
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  return <BlogList posts={sortedPosts} />
}
