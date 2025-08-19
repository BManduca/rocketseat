import CheckIcon from './assets/icons/check_regular.svg?react'
import PencilIcon from './assets/icons/pencil_simple_regular.svg?react'
import PlusIcon from './assets/icons/plus_regular.svg?react'
import SpinnerIcon from './assets/icons/spinner.svg?react'
import TrashIcon from './assets/icons/trash.svg?react'
import XIcon from './assets/icons/x_regular.svg?react'
import Badge from './components/badge'

import Icon from './components/icon'
import Text from './components/text'

export function App() {
  return (
    <div className="grid gap-3">
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

      <div className="flex gap-1">
        <Icon className="fill-pink-base" svg={TrashIcon} />
        <Icon className="fill-green-base" svg={CheckIcon} />
        <Icon className="fill-pink-dark" svg={PencilIcon} />
        <Icon className="fill-green-dark" svg={PlusIcon} />
        <Icon svg={XIcon} />
        <Icon animate svg={SpinnerIcon} />
      </div>

      <div>
        <Badge variant={'secondary'}>5</Badge>
        <Badge variant={'primary'}>2 de 5</Badge>
      </div>
    </div>
  )
}
