/** biome-ignore-all lint/performance/noImgElement: importando componente padrão img */

import { PencilLineIcon } from '@phosphor-icons/react'
import { Avatar } from './Avatar'
import styles from './Sidebar.module.css'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        alt=""
        className={styles.cover}
        src="https://images.unsplash.com/photo-1672957581550-6b37dcdbf6ff?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className={styles.profile}>
        <Avatar src="https://github.com/BManduca.png" />
        <strong>Brunno Manduca</strong>
        <span>Desenvolvedor Web</span>
      </div>

      <footer>
        <a href="/">
          <PencilLineIcon size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}
