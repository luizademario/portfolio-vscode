// Dados do portfólio num só lugar. Se renomear o repositório no GitHub,
// altere apenas `repoName`.
const githubUser = 'luizademario'
const repoName = 'portfolio-vscode'

export const portfolio = {
  githubUser,
  repoName,
  profileUrl: `https://github.com/${githubUser}`,
  repoUrl: `https://github.com/${githubUser}/${repoName}`,
  // Nome da pasta raiz mostrada no explorador (apenas visual).
  explorerRoot: 'portfolio-vscode',
  // Só aparecem no site os repositórios públicos, que não são fork e têm este tópico.
  projectTopic: 'portfolio',
  // Repositórios que nunca aparecem, mesmo com o tópico: o do portfólio e o repositório
  // de perfil (que tem o mesmo nome do usuário).
  excludedRepos: [repoName, githubUser],
  // Quantos projetos aparecem em destaque na home (provisório até o dashboard, Bloco 5).
  featuredCount: 3,
}
