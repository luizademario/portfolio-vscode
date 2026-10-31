import PageContainer from '../components/ui/PageContainer.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

function Contato() {
  usePageTitle('Contato')

  return (
    <PageContainer title="Contato">
      <p>O formulário de contato entra no Bloco 4.</p>
    </PageContainer>
  )
}

export default Contato
