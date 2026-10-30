import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

// Página individual de um projeto (/projetos/<nome>). Os dados do repositório
// (descrição, linguagem, última atualização) chegam no Bloco 3.
function ProjetoDetalhe() {
  const { nome } = useParams()
  usePageTitle(nome)

  return (
    <PageContainer title={nome}>
      <p>Os dados deste repositório serão carregados do GitHub no próximo bloco.</p>
      <Button to="/projetos" variant="secondary">
        Voltar para projetos
      </Button>
    </PageContainer>
  )
}

export default ProjetoDetalhe
