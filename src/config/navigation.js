// Fonte única das páginas: o explorador e as abas leem esta lista.
// Para criar uma página nova, adicione uma linha aqui e uma <Route> em AppRoutes.jsx.
export const pages = [
  { path: '/', file: 'home.jsx', ext: 'jsx', title: 'Início' },
  { path: '/sobre', file: 'sobre.md', ext: 'md', title: 'Sobre' },
  { path: '/projetos', file: 'projetos.js', ext: 'js', title: 'Projetos' },
  { path: '/contato', file: 'contato.css', ext: 'css', title: 'Contato' },
]

// Páginas do dono: têm aba e breadcrumb, mas não aparecem no explorador público.
const hiddenPages = [
  { path: '/login', file: 'login.json', ext: 'json', title: 'Login' },
  { path: '/dashboard', file: 'dashboard.json', ext: 'json', title: 'Dashboard' },
]

// Página de um projeto: /projetos/<nome-do-repositorio>
const projectRoute = /^\/projetos\/([^/]+)$/

// '/sobre/' e '/sobre' são a mesma página.
export function normalizePath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

// Devolve os dados da aba de uma rota, ou null se a rota não tiver aba (ex.: 404).
export function getTabInfo(pathname) {
  const path = normalizePath(pathname)

  const page = [...pages, ...hiddenPages].find((item) => item.path === path)
  if (page) return page

  const project = projectRoute.exec(path)
  if (project) {
    const name = safeDecode(project[1])
    return { path, file: name, ext: 'js', title: name }
  }

  return null
}
