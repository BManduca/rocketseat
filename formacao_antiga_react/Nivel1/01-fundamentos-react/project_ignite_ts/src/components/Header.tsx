import igniteLogo from '../assets/ignite-logo.svg'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      {/** biome-ignore lint/performance/noImgElement: importando component img padrao */}
      <img alt="Logo Ignite Feed" src={igniteLogo} />
    </header>
  )
}
