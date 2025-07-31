/** biome-ignore-all lint/performance/noImgElement: importando componente padrão img */
/** biome-ignore-all lint/a11y/useAltText: não precisa de alt para esse caso */
import styles from './Sidebar.module.css'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1672957581550-6b37dcdbf6ff?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className={styles.profile}>
        <img className={styles.avatar} src="https://github.com/BManduca.png" />
        <strong>Brunno Manduca</strong>
        <span>Desenvolvedor Web</span>
      </div>

      <footer>
        <a href="/">Editar seu perfil</a>
      </footer>
    </aside>
  )
}
