/** biome-ignore-all lint/performance/noImgElement: importando componente padrão img */

import type { ImgHTMLAttributes } from 'react'
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
}

// aplicando conceito de desestruturação
export function Avatar({ hasBorder = true, src, alt, title }: AvatarProps) {
  return (
    <img
      alt={alt}
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      title={title}
    />
  )
}
