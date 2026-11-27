import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Build de produção e `vite preview` usam /todo-app/, o endereço do projeto no GitHub Pages
// (https://guifurlaneti.github.io/todo-app/). O servidor de desenvolvimento continua na raiz.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/todo-app/' : '/',
  plugins: [react()],
}))
