import { useCallback, useMemo, useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTabInfo, normalizePath } from '../config/navigation.js'
import { getNextPathAfterClose, tabsReducer } from '../utils/tabsReducer.js'
import { TabsContext } from './TabsContext.js'

// Guarda quais abas estão abertas. A aba ativa não é guardada: vem sempre da URL.
export function TabsProvider({ children }) {
  const pathname = normalizePath(useLocation().pathname)
  const navigate = useNavigate()

  const [tabs, dispatch] = useReducer(tabsReducer, pathname, (initialPath) =>
    getTabInfo(initialPath) ? [initialPath] : [],
  )

  // Quando a URL muda (clique, link direto, botão voltar), abre a aba daquela página.
  // Feito durante a renderização, comparando com o caminho anterior, para a aba já
  // aparecer no mesmo quadro e para fechar uma aba nunca reabri-la por engano.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    if (getTabInfo(pathname)) dispatch({ type: 'open', path: pathname })
  }

  const closeTab = useCallback(
    (path) => {
      const next = getNextPathAfterClose(tabs, path)
      dispatch({ type: 'close', path })
      if (path !== pathname) return
      if (next === pathname) {
        // Era a única aba e já estamos no início: mantém o início aberto.
        dispatch({ type: 'open', path })
      } else {
        navigate(next)
      }
    },
    [tabs, pathname, navigate],
  )

  const value = useMemo(() => ({ tabs, closeTab }), [tabs, closeTab])

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}
