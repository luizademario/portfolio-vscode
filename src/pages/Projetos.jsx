import PageContainer from '../components/ui/PageContainer.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

function Projetos() {
  usePageTitle('Projetos')

  return (
    <PageContainer title="Projetos">
      <p>Os repositórios do GitHub aparecem aqui no próximo bloco.</p>
    </PageContainer>
  )
}

export default Projetos
