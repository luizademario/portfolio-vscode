# Contexto atual do projeto (para continuar em outra conversa)

**Projeto:** portfólio CP3 (FIAP), React + Vite + JavaScript, visual VS Code. Entrega: 03/11/2026. Dono: iniciante, quer entender tudo.
**Decisões aprovadas:** ver `docs/decisions.md`. **Regras para a IA:** ver `AGENTS.md`.
**Modo de trabalho atual:** a IA entrega blocos completos (arquivos prontos), explica brevemente e diz como testar. Sem push nem publicação sem confirmação do dono.

## Concluído
- Ambiente validado (Node 24, npm 11, Git), projeto Vite criado, repositório Git local iniciado em `main`.
- **Bloco 1** (moldura): gerado e entregue.
- **Bloco 2 gerado** (páginas): Início, Sobre, rota `/projetos/:nome` com aba própria, botões e etiquetas reutilizáveis, título da página do navegador. Dados dos repositórios ainda não existem (Bloco 3).

## Arquivos do Bloco 1
`index.html`, `vercel.json`, `AGENTS.md`, `docs/*`, `src/main.jsx`, `src/App.jsx`, `src/routes/AppRoutes.jsx`,
`src/config/{navigation,portfolio}.js`, `src/context/{Theme,Tabs}{Context.js,Provider.jsx}`,
`src/hooks/{useTheme,useTabs}.js`, `src/utils/tabsReducer.js`, `src/styles/{tokens,global}.css`,
`src/components/layout/*` (AppShell, ActivityBar, Sidebar, TabBar, StatusBar), `src/components/ui/*`, `src/pages/*`.
Dependências novas: `react-router-dom` (rotas), `vitest` (testes, dev).

## Testes
`npm test`: 13 testes (lógica das abas e da navegação, incluindo rota de projeto). Ainda não há testes de formulário nem de dashboard.

## Problemas conhecidos / pendências
- Paleta provisória: ajustar com as capturas da referência.
- Fonte monoespaçada: ainda a do sistema; decidir arquivo próprio no bloco de performance.
- `src/config/profile.js`: o dono precisa preencher `name` e revisar cada frase (só fatos verdadeiros). Os campos com TODO pedem o que ele fez no SpaceLaunch Optimizer.
- Home, Projetos e detalhe têm avisos provisórios até o Bloco 3.
- Pendentes do setup: Prettier, Husky + lint-staged, GitHub Actions, proteção da `main`, remote do GitHub (`origin`) e conexão com a Vercel.
- O repositório no GitHub se chama `Portif-lio-vscode` (o GitHub tirou os acentos). Se renomear, mudar `repoName` em `src/config/portfolio.js`.

## Próximo passo
Bloco 3: API do GitHub (sem forks e sem o repositório do portfólio), TanStack Query, cards com skeleton, erro e lista vazia, detalhe do projeto com dados reais.
