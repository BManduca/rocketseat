import React from "react"
import SearchIcon from "../assets/icons/search.svg?react"
import { usePhotos } from "../contexts/photos/hooks/use-photos"
import { debounce } from "../helpers/utils"
import { InputText } from "./input-text"

export function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState("")
  const { filters } = usePhotos()
  const { setQ } = filters

  const debouncedSetValue = React.useMemo(
    () => debounce((value: string) => setQ(value), 500),
    [setQ]
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    setInputValue(value)
    debouncedSetValue(value)
  }

  return (
    <InputText
      className="flex-1"
      icon={SearchIcon}
      onChange={handleInputChange}
      placeholder="Buscar fotos..."
      value={inputValue}
    />
  )
}
