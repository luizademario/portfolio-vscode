import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import PageLoading from '../components/ui/PageLoading.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { usePageTitle } from '../hooks/usePageTitle.js'

// Área do dono. Quem já está logado vai direto para o dashboard.
function Login({ login }) {
  usePageTitle('Login')
  const navigate = useNavigate()
  const location = useLocation()
  const { status } = useAuth()
  const destination = location.state?.from ?? '/dashboard'

  if (status === 'loading') return <PageLoading label="Verificando acesso…" />
  if (status === 'authenticated') return <Navigate to={destination} replace />

  return (
    <PageContainer title="Login">
      <p>Área restrita ao dono do site.</p>
      <LoginForm login={login} onSuccess={() => navigate(destination, { replace: true })} />
    </PageContainer>
  )
}

export default Login
