import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

type UseClipboardProps = {
  timeout?: number
}

export const useClipboard = ({ timeout = 2000 }: UseClipboardProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      toast.error('Clipboard não suportado.')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
    } catch (error) {
      toast.error(`Falha ao copiar o texto: ${error}`)
      setIsCopied(false)
      return false
    }
  }, [])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, timeout)
      return () => clearTimeout(timer)
    }
  }, [isCopied, timeout])

  return {
    isCopied,
    handleCopy,
  }
}
