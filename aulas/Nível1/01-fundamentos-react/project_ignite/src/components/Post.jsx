// props: { author: "", content: "" }

export function Post(props) {
  return (
    <div>
      <strong>Autor: {props.author}</strong>
      <p>Conteudo: {props.content}</p>
    </div>
  )
}
