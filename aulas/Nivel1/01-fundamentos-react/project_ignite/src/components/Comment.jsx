/** biome-ignore-all lint/performance/noImgElement: importando componente padrão img */
import { ThumbsUpIcon, TrashIcon } from '@phosphor-icons/react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

export function Comment() {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/BManduca.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Brunno Manduca</strong>
              <time
                dateTime="2025-07-22 08:20:45"
                title="22 de Julho de 2025 às 08:20:45"
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button title="Deletar comentário" type="button">
              <TrashIcon size={24} />
            </button>
          </header>
          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>

        <footer>
          <button type="button">
            <ThumbsUpIcon size={20} />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
