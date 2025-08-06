import { Header } from './components/Header'
import { Post, type PostType } from './components/Post'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'

// author: { avatar_url: "", name: "", role: "" }
// publisedAt: Date <- como serão varios formatos de data, então será utilizado Date
// content: String

type PostData = PostType & { id: number }

const posts: PostData[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https:github.com/BManduca.png',
      name: 'Brunno Manduca',
      role: 'Desenvolvedor Web',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
      { type: 'hashtag', content: '#novoprojeto' },
      { type: 'hashtag', content: '#nlw' },
      { type: 'hashtag', content: '#rocketseat' },
    ],
    publishedAt: new Date('2025-08-03 20:37:45'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https:github.com/Climacobnu.png',
      name: 'Leandro Climaco',
      role: 'Dev Full Stack',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
      { type: 'hashtag', content: '#novoprojeto' },
      { type: 'hashtag', content: '#nlw' },
      { type: 'hashtag', content: '#rocketseat' },
    ],
    publishedAt: new Date('2025-07-10 20:00:00'),
  },
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </div>
  )
}
