// Escolhe quais projetos aparecem em destaque na Home.
// - Com destaques marcados pelo dono: só eles (na ordem da lista de projetos).
// - Sem nenhum marcado (ou se os marcados não existem mais): os primeiros `fallbackCount`.
export function selectFeatured(repos, featuredNames, fallbackCount) {
  const wanted = new Set((featuredNames ?? []).map((name) => name.toLowerCase()))
  const chosen = repos.filter((repo) => wanted.has(repo.name.toLowerCase()))
  return chosen.length > 0 ? chosen : repos.slice(0, fallbackCount)
}
