import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import PageLoading from '../ui/PageLoading.jsx'

// Só mostra o conteúdo para quem está logado; os demais vão para /login.
// Atenção: isto é conforto de navegação. A proteção de verdade dos dados é a RLS do banco.
function RequireAuth({ children }) {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') return <PageLoading label="Verificando acesso…" />
  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}

export default RequireAuth
