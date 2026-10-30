import { useEffect } from 'react'

// Título da aba do navegador: "Sobre | Portfólio". Sem título, fica só "Portfólio".
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Portfólio` : 'Portfólio'
  }, [title])
}
