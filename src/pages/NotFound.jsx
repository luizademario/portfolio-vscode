import PageContainer from '../components/ui/PageContainer.jsx'
import Button from '../components/ui/Button.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

function NotFound() {
  usePageTitle('Página não encontrada')

  return (
    <PageContainer title="404: arquivo não encontrado">
      <p>Esta página não existe ou foi movida.</p>
      <Button to="/">Voltar para home.jsx</Button>
    </PageContainer>
  )
}

export default NotFound
