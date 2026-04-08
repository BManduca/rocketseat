import { useRouter } from 'next/router'
import { Search } from '@/components/search'
import { PostCard } from './components/post-card'

export function BlogList() {
  const router = useRouter()
  const rawQuery = (router.query.q as string) || ''
  const query = decodeURIComponent(rawQuery)

  const pageTitle = query
    ? `Resultados de busca para "${query}"`
    : 'Dicas e estratégias para impulsionar seu negócio'

  return (
    <div className="flex flex-col py-24 flex-grow h-full">
      <header className="">
        <div className="container space-y-6 flex flex-col items-start justify-between md:flex-row md:items-end lg:items-end">
          <div className="flex flex-col gap-4 md:px-0">
            {/* TAG */}
            <span className="text-body-tag text-cyan-100 w-fit rounded-md text-center md:text-left py-2 px-4 bg-cyan-300">
              BLOG
            </span>

            {/* título */}
            <h1 className="text-balance text-start md:text-left text-heading-lg md:text-heading-xl max-w-2xl text-gray-100">
              {pageTitle}
            </h1>
          </div>
          {/* Search */}
          <Search />
        </div>
      </header>

      {/* Listagem de posts */}
      <PostCard
        title="Transformando seu negócio em uma loja virtual"
        description="Se você está buscando uma maneira simples e eficaz de vender seus produtos online, o Site.Set é a solução perfeita para você. Criar uma loja virtual de sucesso nunca foi tão fácil. Com nossa plataforma intuitiva, você pode criar um site profissional para sua loja em minutos, sem precisar de conhecimentos técnicos."
        date="20/12/2024"
        author={{ avatar: '/customer-01.png', name: 'Aspen Dokidis' }}
        image="/assets/primeiro-post.png"
        slug="/transformando"
      />
    </div>
  )
}
