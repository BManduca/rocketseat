/** biome-ignore-all lint/performance/noImgElement: importando componente padrão img */
/** biome-ignore-all lint/suspicious/noConsole: use in debug */
/** biome-ignore-all lint/a11y/useAltText: não precisa de alt para esse caso */

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

// estado -> variáveis que eu gostaria que o componente monitore

export function Post({ post }) {
  const [comments, setComments] = useState(['Post muito bacana, hein?!'])

  const [newCommentText, setNewCommentText] = useState('')

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

  function handleCreateNewComment(event) {
    event.preventDefault()

    // imutabilidade
    setComments([...comments, newCommentText])

    // após criar um novo comentário,
    // resetamos o valor do estado que armazena o conteudo da TextArea para seu valor original
    setNewCommentText('')
  }

  function handleNewCommentChange(event) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOne)
  }

  function renderHashtagGroup(hashtags, keyPrefix) {
    return (
      <p key={`hashtags-${keyPrefix}`}>
        {hashtags.map((hashtag) => (
          <a className={styles.hashtag} href="/" key={`${hashtag.content}`}>
            {hashtag.content}
          </a>
        ))}
      </p>
    )
  }

  function renderElement(line, index) {
    if (line.type === 'paragraph') {
      return <p key={`${line.type}-${line.content}-${index}`}>{line.content}</p>
    }

    if (line.type === 'link') {
      return (
        <p key={`${line.type}-${line.content}-${index}`}>
          <a href="/">{line.content}</a>
        </p>
      )
    }

    return null
  }

  function renderContent(content) {
    const elements = []
    let hashtags = []

    content.forEach((line, index) => {
      if (line.type === 'hashtag') {
        hashtags.push(line)
        return
      }

      // renderiza hashtags acumuladas
      if (hashtags.length > 0) {
        elements.push(renderHashtagGroup(hashtags, index))
        hashtags = []
      }

      // Renderizar elemento atual
      const element = renderElement(line, index)
      if (element) {
        elements.push(element)
      }
    })

    // Renderizar hashtags finais se houver
    if (hashtags.length > 0) {
      elements.push(renderHashtagGroup(hashtags, 'final'))
    }

    return elements
  }

  const isNewCommentEmpty = newCommentText.length === 0

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

      <div className={styles.content}>{renderContent(post.content)}</div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          placeholder="Deixe um comentário"
          required
          value={newCommentText}
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              content={comment}
              key={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}
