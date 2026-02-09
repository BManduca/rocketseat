import { useParams } from "react-router"
import Text from "../components/text"

export function PagePhotoDetails() {
  const { id } = useParams()

  return (
    <div>
      <Text variant="heading-medium">Página Detalhes da foto</Text>
      <hr />
      <Text variant="heading-medium">Id da Foto: {id}</Text>
    </div>
  )
}
