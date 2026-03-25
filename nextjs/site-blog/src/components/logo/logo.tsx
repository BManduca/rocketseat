import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/logo.svg" title="Link para a página inicial">
      <Image src="/logo.svg" alt="logo site" width={116} height={32} />
    </Link>
  )
}
