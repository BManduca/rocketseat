import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import PostPage from '@/pages/blog-page/[slug]'

type BlogPostPage = {
  params: Promise<{
    slug: string
  }>
}

// revalida a cada 60 segundos, para que o next crie novamente
// sem a necessidade de dar build da aplicação inteira novamente
export const revalidate = 60

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPage) {
  // server side
  const { slug } = await params
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return <PostPage post={post} />
}
