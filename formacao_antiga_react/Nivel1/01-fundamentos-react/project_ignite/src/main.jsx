import { StrictMode } from 'react'
/*
  React -> responsável pelo core('coração') do React, aonde tem todas 
  as funcionalidades compartilhadas com todas as interfaces/ambientes/clientes
  (React Native, React Web, Tv, VR..)

  React Dom -> Integração do core do React com a DOM(Documento Object Model) -> 
  Representação do HTML através do JS
*/
import { createRoot } from 'react-dom/client'
import { App } from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
