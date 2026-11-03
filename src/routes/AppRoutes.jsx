import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import PageLoading from '../components/ui/PageLoading.jsx'
import { TabsProvider } from '../context/TabsProvider.jsx'
import Contato from '../pages/Contato.jsx'
import Home from '../pages/Home.jsx'
import NotFound from '../pages/NotFound.jsx'
import ProjetoDetalhe from '../pages/ProjetoDetalhe.jsx'
import Projetos from '../pages/Projetos.jsx'
import Sobre from '../pages/Sobre.jsx'

// Login e dashboard (e o supabase-js) só são baixados por quem entra nessas páginas.
const Login = lazy(() => import('../pages/Login.jsx'))
const Dashboard = lazy(() => import('../pages/Dashboard.jsx'))

function lazyPage(Page) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Page />
    </Suspense>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <TabsProvider>
            <AppShell />
          </TabsProvider>
        }
      >
        <Route index element={<Home />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="projetos" element={<Projetos />} />
        <Route path="projetos/:nome" element={<ProjetoDetalhe />} />
        <Route path="contato" element={<Contato />} />
        <Route path="login" element={lazyPage(Login)} />
        <Route path="dashboard" element={lazyPage(Dashboard)} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
