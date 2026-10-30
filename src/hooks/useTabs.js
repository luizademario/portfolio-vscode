import { useContext } from 'react'
import { TabsContext } from '../context/TabsContext.js'

export function useTabs() {
  const context = useContext(TabsContext)
  if (!context) throw new Error('useTabs deve ser usado dentro de TabsProvider')
  return context
}
