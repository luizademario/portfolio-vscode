import { Route, Routes } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import { TabsProvider } from '../context/TabsProvider.jsx'
import Contato from '../pages/Contato.jsx'
import Home from '../pages/Home.jsx'
import NotFound from '../pages/NotFound.jsx'
import ProjetoDetalhe from '../pages/ProjetoDetalhe.jsx'
import Projetos from '../pages/Projetos.jsx'
import Sobre from '../pages/Sobre.jsx'

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
