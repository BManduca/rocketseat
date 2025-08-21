import CheckIcon from '../assets/icons/check.svg?react'
import PencilIcon from '../assets/icons/pencil_simple_regular.svg?react'
import PlusIcon from '../assets/icons/plus_regular.svg?react'
import SpinnerIcon from '../assets/icons/spinner.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import XIcon from '../assets/icons/x_regular.svg?react'
import Badge from '../components/badge'
import Button from '../components/button'
import ButtonIcon from '../components/button-icon'
import Card from '../components/card'
import Container from '../components/container'
import Icon from '../components/icon'
import InputCheckbox from '../components/input-checkbox'
import InputText from '../components/input-text'
import Skeleton from '../components/skeleton'
import Text from '../components/text'

export default function PageComponents() {
  return (
    <Container>
      <div className="grid gap-10">
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
        <div className="flex gap-1">
          <Badge variant={'secondary'}>5</Badge>
          <Badge variant={'primary'}>2 de 5</Badge>
          <Badge loading>5</Badge>
        </div>
        <div>
          <Button icon={PlusIcon}>Nova tarefa</Button>
        </div>
        <div className="flex gap-1">
          <ButtonIcon icon={TrashIcon} />
          <ButtonIcon icon={TrashIcon} variant={'secondary'} />
          <ButtonIcon icon={TrashIcon} variant={'tertiary'} />
          <ButtonIcon icon={TrashIcon} loading />
        </div>
        <div>
          <InputText />
        </div>

        <div>
          <InputCheckbox />

          <InputCheckbox loading />
        </div>

        <div>
          <Card size={'md'}>Olá Mundo!</Card>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8 w-96" />
        </div>
      </div>
    </Container>
  )
}
