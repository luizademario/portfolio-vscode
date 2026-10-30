// Lógica pura das abas abertas: o estado é só a lista de caminhos, em ordem.
export function tabsReducer(tabs, action) {
  switch (action.type) {
    case 'open':
      return tabs.includes(action.path) ? tabs : [...tabs, action.path]
    case 'close':
      return tabs.filter((path) => path !== action.path)
    default:
      return tabs
  }
}

// Para onde ir ao fechar uma aba: a vizinha da direita; se não houver, a da esquerda;
// se não sobrar nenhuma, a página inicial.
export function getNextPathAfterClose(tabs, closingPath) {
  const index = tabs.indexOf(closingPath)
  const remaining = tabs.filter((path) => path !== closingPath)
  if (remaining.length === 0) return '/'
  const position = index === -1 ? remaining.length - 1 : Math.min(index, remaining.length - 1)
  return remaining[position]
}
