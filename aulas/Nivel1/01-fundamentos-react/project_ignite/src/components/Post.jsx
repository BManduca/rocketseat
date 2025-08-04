/** biome-ignore-all lint/performance/noImgElement: importando componente padrão img */
/** biome-ignore-all lint/a11y/useAltText: não precisa de alt para esse caso */

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

export function Post({ post }) {
  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          dateTime={post.publishedAt.toISOString()}
          title={publishedDateFormatted}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {(() => {
          const elements = []
          let hashtags = []

          post.content.forEach((line, index) => {
            if (line.type === 'paragraph') {
              // Se temos hashtags acumuladas, renderizá-las primeiro
              if (hashtags.length > 0) {
                elements.push(
                  <p key={`hashtags-${index}`}>
                    {hashtags.map((hashtag, hashtagIndex) => (
                      <a className={styles.hashtag} href="/" key={hashtagIndex}>
                        {hashtag.content}
                      </a>
                    ))}
                  </p>
                )
                hashtags = []
              }
              elements.push(<p key={index}>{line.content}</p>)
            } else if (line.type === 'link') {
              // Se temos hashtags acumuladas, renderizá-las primeiro
              if (hashtags.length > 0) {
                elements.push(
                  <p key={`hashtags-${index}`}>
                    {hashtags.map((hashtag, hashtagIndex) => (
                      <a className={styles.hashtag} href="/" key={hashtagIndex}>
                        {hashtag.content}
                      </a>
                    ))}
                  </p>
                )
                hashtags = []
              }
              elements.push(
                <p key={index}>
                  <a href="/">{line.content}</a>
                </p>
              )
            } else if (line.type === 'hashtag') {
              hashtags.push(line)
            }
          })

          // Renderizar hashtags restantes no final
          if (hashtags.length > 0) {
            elements.push(
              <p key="hashtags-final">
                {hashtags.map((hashtag, hashtagIndex) => (
                  <a className={styles.hashtag} href="/" key={hashtagIndex}>
                    {hashtag.content}
                  </a>
                ))}
              </p>
            )
          }

          return elements
        })()}
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
