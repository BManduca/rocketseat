/** biome-ignore-all lint/performance/noImgElement: importando componente padrão img */

import styles from './Avatar.module.css'

// aplicando conceito de desestruturação
export function Avatar({ hasBorder = true, src }) {
  return (
    <img
      alt=""
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  )
}
