// Dados simulados no formato da API do GitHub (/users/:user/repos), com os nomes reais da conta.
// Só os campos que o site lê. Usado apenas nos testes.
function repo(name, extra = {}) {
  return {
    id: Math.abs([...name].reduce((sum, char) => sum * 31 + char.charCodeAt(0), 7)) % 1e9,
    name,
    private: false,
    fork: false,
    description: `Descrição de ${name}`,
    language: 'JavaScript',
    topics: [],
    stargazers_count: 0,
    homepage: null,
    html_url: `https://github.com/luizademario/${name}`,
    created_at: '2026-01-10T12:00:00Z',
    pushed_at: '2026-09-01T12:00:00Z',
    updated_at: '2026-09-01T12:00:00Z',
    ...extra,
  }
}

const forks = ['2SEM---Aula-2---APIs', 'projeto-loja-virtual', 'techstore-base'].map((name) =>
  repo(name, { fork: true, topics: ['portfolio'] }),
)

// 17 repositórios públicos: 3 forks, o do portfólio, o de perfil, os 2 com o tópico e o restante sem tópico.
export const reposDaConta = [
  repo('novo-tv-time', { topics: ['portfolio', 'react'], pushed_at: '2026-10-20T12:00:00Z' }),
  repo('Vinheria_Agnello', { topics: ['portfolio'], pushed_at: '2026-08-05T12:00:00Z' }),
  repo('portfolio-vscode', { topics: ['react', 'vite'] }),
  repo('luizademario'),
  ...forks,
  ...Array.from({ length: 10 }, (_, index) => repo(`exercicio-${index + 1}`)),
]

export const reposSemTopico = reposDaConta.map((item) => ({ ...item, topics: [] }))

// Resposta de fetch simulada.
export function jsonResponse(body, { status = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })
}
