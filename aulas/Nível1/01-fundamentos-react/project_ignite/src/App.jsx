import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <h1>Hello World</h1>
          <Post
            author="Brunno Manduca"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aliquid officiis quam blanditiis reiciendis consequuntur quis, natus doloribus quae. Perferendis blanditiis explicabo dicta voluptatem numquam eos, totam ex libero quas?"
          />
          <Post author="Gabriel Silva" content="Um post legal." />
        </main>
      </div>
    </div>
  )
}
