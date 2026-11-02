import ContactForm from '../components/contact/ContactForm.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

function Contato() {
  usePageTitle('Contato')

  return (
    <PageContainer title="Contato">
      <p>Deixe uma mensagem pelo formulário. Todos os campos são obrigatórios.</p>
      <ContactForm />
    </PageContainer>
  )
}

export default Contato
