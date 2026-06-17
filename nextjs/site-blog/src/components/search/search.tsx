'use client'

import { CircleX, SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export const Search = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') ?? ''
  const hasQuery = !!searchParams?.has('q')

  // estado local para o input (permitindo acentos)
  const [searchValue, setSearchValue] = useState(query)

  // sincronizando o estado local com a URL se a URL mudar externamente (ex: botão de voltar)
  useEffect(() => {
    setSearchValue(query)
  }, [query])

  // debounce: atualiza a URL 300ms após o usuário parar de digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      // só atualiza se o valor for diferente do que já está na URL para evitar loops
      if (searchValue !== query) {
        router.push(
          searchValue.trim()
            ? `/blog?q=${encodeURIComponent(searchValue.trim())}`
            : '/blog',
          { scroll: false },
        )
      }
    }, 300)

    return () => clearTimeout(handler)
  }, [searchValue, query, router])

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      // O submit manual apenas reforça a busca imediata se necessário
      router.push(
        searchValue.trim()
          ? `/blog?q=${encodeURIComponent(searchValue.trim())}`
          : '/blog',
        { scroll: false },
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

  useEffect(() => {
    if (hasQuery) {
      inputRef.current?.focus()
    }
  }, [hasQuery])

  return (
    <form onSubmit={handleSearch} className="relative group w-full md:w-60">
      <SearchIcon
        className={cn(
          'text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 group-focus-within:text-blue-300',
          searchValue ? 'text-blue-300' : '',
        )}
      />
      <input
        ref={inputRef}
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
