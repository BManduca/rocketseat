import cx from "classnames"
import type React from "react"
import { useNavigate } from "react-router"
import ArrowLeftIcon from "../../../assets/icons/chevron-left.svg?react"
import ArrowRightIcon from "../../../assets/icons/chevron-right.svg?react"
import Button from "../../../components/button"
import ButtonIcon from "../../../components/button-icon"
import Skeleton from "../../../components/skeleton"

interface PhotosNavigatorProps extends React.ComponentProps<"div"> {
  previousPhotoId?: string
  nextPhotoId?: string
  loading?: boolean
}

export function PhotosNavigator({
  previousPhotoId,
  nextPhotoId,
  loading,
  className,
  ...props
}: PhotosNavigatorProps) {
  const navigate = useNavigate()

  return (
    <div className={cx("flex gap-2", className)} {...props}>
      {loading ? (
        <>
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-20" />
        </>
      ) : (
        <>
          <ButtonIcon
            disabled={!previousPhotoId}
            icon={ArrowLeftIcon}
            onClick={() => navigate(`/fotos/${previousPhotoId}`)}
            variant="secondary"
          />
          <Button
            disabled={!nextPhotoId}
            icon={ArrowRightIcon}
            onClick={() => navigate(`/fotos/${nextPhotoId}`)}
            variant="secondary"
          >
            Próxima imagem
          </Button>
        </>
      )}
    </div>
  )
}
