import type { GetStaticProps } from 'next'

interface ISRProps {
  currentTime: string
}

export default function ISRPage({ currentTime }: ISRProps) {
  return (
    <div className="mt-10 flex flex-col items-center text-center">
      <h1 className="text-heading-hg text-blue-200">
        Incremental Static Regeneration (ISR)
      </h1>
      <p className="text-gray-200">Current Time: {currentTime}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps<ISRProps> = async () => {
  const currentTime = new Date().toISOString()

  return {
    props: { currentTime },
    revalidate: 10,
  }
}
