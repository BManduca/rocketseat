import React from "react"
import SearchIcon from "../assets/icons/search.svg?react"
import { debounce } from "../helpers/utils"
import { InputText } from "./input-text"

export function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState("")

  const debouncedSetValue = React.useCallback(
    debounce(
      (value: string) => console.log("Valor com debounce: ", value),
      500
    ),
    []
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
