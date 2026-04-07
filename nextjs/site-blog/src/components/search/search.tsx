import { CircleX, SearchIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export const Search = () => {
  const router = useRouter()
  // estado local para o input (permitindo acentos)
  const [searchValue, setSearchValue] = useState('')

  // sincronizando o estado local com a URL apenas no carregamento inicial ou quando o router estiver pronto
  useEffect(() => {
    if (router.isReady && router.query.q) {
      setSearchValue(decodeURIComponent(router.query.q as string))
    }
  }, [router.isReady, router.query.q])

  // debounce: atualiza a URL 300ms após o usuário parar de digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      // só atualiza se o valor for diferente do que já esta na URL para evitar loops
      const currentQuery = (router.query.q as string) || ''
      if (searchValue !== currentQuery) {
        router.push(
          searchValue.trim() ? `/blog?q=${encodeURIComponent(searchValue.trim())}` : '/blog',
          undefined,
          { shallow: true, scroll: false },
        )
      }
    }, 300)

    return () => clearTimeout(handler)
  }, [searchValue, router])

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      // O submit manual apenas reforça a busca imediata se necessário
      router.push(
        searchValue.trim() ? `/blog?q=${encodeURIComponent(searchValue.trim())}` : '/blog',
        undefined,
        { shallow: true, scroll: false },
      )
    },
    [searchValue, router],
  )

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const resetSearch = () => {
    setSearchValue('')
  }

  return (
    <form onSubmit={handleSearch} className="relative group w-full md:w-60">
      <SearchIcon
        className={cn(
          'text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 group-focus-within:text-blue-300',
          searchValue ? 'text-blue-300' : '',
        )}
      />
      <input
        type="text"
        placeholder="Buscar"
        value={searchValue}
        onChange={handleQueryChange}
        className="w-full h-10 md:w-60 bg-transparent border border-gray-400 pl-9 text-gray-100 rounded-md text-body-sm outline-none transition-all duration-200 focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300 placeholder:text-gray-300 placeholder:text-body-sm"
      />
      {searchValue && (
        <CircleX
          className="absolute w-4 h-4 top-1/2 -translate-y-1/2 right-3 text-gray-300 cursor-pointer"
          onClick={resetSearch}
        />
      )}
    </form>
  )
}
