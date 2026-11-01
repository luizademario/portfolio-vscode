import Button from '../components/ui/Button.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import TagList from '../components/ui/TagList.jsx'
import { profile } from '../config/profile.js'
import { usePageTitle } from '../hooks/usePageTitle.js'

function Sobre() {
  usePageTitle('Sobre')
  const { education } = profile

  return (
    <PageContainer title="Sobre">
      {profile.summary.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <h2>Formação</h2>
      <p>
        {education.course} na {education.school} ({education.period}).
      </p>

      <h2>Tecnologias que estudo e uso</h2>
      <TagList items={profile.technologies} />

      <h2>Contato</h2>
      <Button to="/contato">Enviar uma mensagem</Button>
    </PageContainer>
  )
}

export default Sobre
