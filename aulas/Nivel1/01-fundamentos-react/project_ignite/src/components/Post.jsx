/** biome-ignore-all lint/performance/noImgElement: importando componente padrão img */
/** biome-ignore-all lint/a11y/useAltText: não precisa de alt para esse caso */
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src="https://github.com/BManduca.png" />
          <div className={styles.authorInfo}>
            <strong>Brunno Manduca</strong>
            <span>Desenvolvedor Web</span>
          </div>
        </div>

        <time
          dateTime="2025-07-22 08:20:45"
          title="22 de Julho de 2025 às 08:20:45"
        >
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa 👋</p>

        <p>
          Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
          no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀
        </p>

        <p>
          👉 <a href="/"> jane.design/doctorcare</a>
        </p>

        <p>
          <a href="/">#novoprojeto</a> <a href="/">#nlw </a>{' '}
          <a href="/">#rocketseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder="Deixe um comentário" />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className="commentList">
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}
