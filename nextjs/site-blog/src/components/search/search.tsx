import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/router'

export const Search = () => {
  const router = useRouter()
  const query = router.query.q as string

  console.log(query)
  return (
    <form className="relative">
      <SearchIcon className="text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200" />
      <input
        type="text"
        placeholder="Buscar"
        className="h-10 w-72 bg-transparent border border-gray-400 pl-9 text-gray-100 rounded-md text-body-sm outline-none transition-all duration-200 focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300 placeholder:text-gray-300 placeholder:text-body-sm"
      />
    </form>
  )
}
