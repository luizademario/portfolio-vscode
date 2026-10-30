import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ActivityBar from './ActivityBar.jsx'
import Sidebar from './Sidebar.jsx'
import StatusBar from './StatusBar.jsx'
import TabBar from './TabBar.jsx'
import styles from './AppShell.module.css'

// Moldura de toda a aplicação: barra de ícones, explorador, abas, conteúdo e barra de status.
function AppShell() {
  const [sidebarVisible, setSidebarVisible] = useState(true) // desktop: mostrar/esconder
  const [drawerOpen, setDrawerOpen] = useState(false) // celular: gaveta aberta ou fechada
  const { pathname } = useLocation()
  const contentRef = useRef(null)

  // Esc fecha a gaveta no celular.
  useEffect(() => {
    if (!drawerOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  // Ao trocar de página, o conteúdo volta ao topo.
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={styles.shell} data-sidebar={sidebarVisible ? 'visible' : 'hidden'}>
      <a className={styles.skip} href="#conteudo">
        Ir para o conteúdo
      </a>

      <ActivityBar
        sidebarVisible={sidebarVisible}
        onToggleSidebar={() => setSidebarVisible((visible) => !visible)}
      />

      <Sidebar
        isHidden={!sidebarVisible}
        isDrawerOpen={drawerOpen}
        onNavigate={() => setDrawerOpen(false)}
      />
      {drawerOpen && (
        <div className={styles.backdrop} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      )}

      <div className={styles.main}>
        <TabBar drawerOpen={drawerOpen} onToggleDrawer={() => setDrawerOpen((open) => !open)} />
        <main id="conteudo" className={styles.content} ref={contentRef} tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <StatusBar />
    </div>
  )
}

export default AppShell
