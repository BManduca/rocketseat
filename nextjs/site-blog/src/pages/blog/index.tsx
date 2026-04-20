import { allPosts } from 'contentlayer/generated'
import type { GetStaticProps } from 'next'
import { BlogList, type BlogListProps } from '@/templates/blog'

export default function BlogPage({ posts }: BlogListProps) {
  return <BlogList posts={posts} />
}

export const getStaticProps = (async () => {
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return {
    props: { posts: sortedPosts },
  }
}) satisfies GetStaticProps<BlogListProps>
