import Text from './components/text'

export function App() {
  return (
    <div className="flex flex-col gap-2">
      <Text className="text-pink-base" variant={'body-sm-bold'}>
        <h1>Olá Mundo</h1>
      </Text>
      <Text className="text-green-base">
        <h1>Olá Mundo</h1>
      </Text>
      <Text variant={'body-md-bold'}>
        <h1>Olá Mundo</h1>
      </Text>
      <Text>
        <h1>Levar o dog para passear</h1>
      </Text>
    </div>
  )
}
