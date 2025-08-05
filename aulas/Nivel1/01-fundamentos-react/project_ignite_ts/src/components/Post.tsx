/** biome-ignore-all lint/performance/noImgElement: importando componente padrão img */
/** biome-ignore-all lint/suspicious/noConsole: use in debug */
/** biome-ignore-all lint/a11y/useAltText: não precisa de alt para esse caso */

import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import {
  type ChangeEvent,
  type FormEvent,
  type InvalidEvent,
  useState,
} from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

// estado -> variáveis que eu gostaria que o componente monitore

export interface Author {
  name: string
  role: string
  avatarUrl: string
}

export interface Content {
  type: 'paragraph' | 'link' | 'hashtag'
  content: string
}

export interface PostProps {
  author: Author
  publishedAt: Date
  content: Content[]
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(['Post muito bacana, hein?!'])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    // imutabilidade
    setComments([...comments, newCommentText])

    // após criar um novo comentário,
    // resetamos o valor do estado que armazena o conteudo da TextArea para seu valor original
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOne)
  }

  function renderHashtagGroup(hashtags: Content[], keyPrefix: string | number) {
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

  function renderElement(line: Content, index: number) {
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

  function renderContent(contentArray: Content[]) {
    const elements: React.ReactElement[] = []
    let hashtags: Content[] = []

    contentArray.forEach((line, index) => {
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
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          dateTime={publishedAt.toISOString()}
          title={publishedDateFormatted}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>{renderContent(content)}</div>

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
