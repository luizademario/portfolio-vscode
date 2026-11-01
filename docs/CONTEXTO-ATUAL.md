# Contexto atual do projeto (para continuar em outra conversa)

**Projeto:** portfólio CP3 (FIAP), React + Vite + JavaScript, visual VS Code. Entrega: 03/11/2026. Dono: iniciante, quer entender tudo.
**Decisões aprovadas:** `docs/decisions.md`. **Regras para a IA:** `AGENTS.md`. **Referência visual medida:** `docs/referencia-visual.md`.
**Modo de trabalho:** a IA entrega blocos completos (arquivos prontos em zip), explica brevemente e diz como testar. Roda lint, testes e build no ambiente dela e diz o que não conseguiu verificar. Sem push nem publicação sem confirmação do dono. Cada bloco vai para um chat novo; este arquivo e o zip do projeto são a ponte.

## Concluído

- Ambiente (Node 24, npm 11, Git), projeto Vite, repositório no GitHub (`luizademario/portfolio-vscode`, hoje privado: **tornar público antes da entrega**).
- **Blocos 1 e 2** (moldura, abas, tema, Início, Sobre, rota `/projetos/:nome`, Button, TagList) integrados na `main`.
- **Publicação (conferido pelo dono):** Vercel com deploy automático a cada push na `main`; F5 em `/sobre` sem 404.
- **Qualidade (conferido pelo dono):** Prettier, Husky + lint-staged (hook visto funcionando no commit), GitHub Actions verde (CI #2). LF fixado após o CI #1 reprovar por CRLF.
- **Ajuste visual (conferido pelo dono):** paleta escura medida, barra de status escura com contador decorativo, indicador coral, `Breadcrumb`, Home em hero. Verificado no ambiente da IA: lint, `format:check`, 16 testes e build.

## Estado do Git

Branches integradas: `feature/layout-shell`, `chore/qualidade`, `fix/formatacao-ci`, `feature/ajuste-visual`. Próxima branch: `feature/github-api` (commit: `feat: lista repositórios do GitHub com tópico portfolio`).

- **Bloco 3 (entregue pela IA, ainda não conferido pelo dono):** API do GitHub com TanStack Query, `RepoList`/`RepoCard`/`RepoCardSkeleton`/`StatusMessage`, página de detalhes pelo cache, destaques provisórios na Home, seção de destaque removida de Sobre. Verificado no ambiente da IA: lint, `format:check`, 52 testes e build. **Não verificado:** resposta real da API (limite de requisições no ambiente da IA), aparência no navegador, tópicos nos repositórios.

## Pendências

- Adicionar o tópico `portfolio` nos repositórios `novo-tv-time` e `Vinheria_Agnello` no GitHub; sem ele a lista aparece vazia.
- Confirmar na resposta real da API que `topics` vem na listagem (se não vier, o site mostra o erro "Resposta inesperada" e é preciso trocar a abordagem).
- `src/config/profile.js`: o dono precisa preencher `name` e revisar as frases (só fatos verdadeiros).
- Commitlint (opcional); repositório público antes da entrega.
- Fonte monoespaçada ainda é a do sistema (decidir no bloco de performance).
- Opcional: barra de menu decorativa, ícones de arquivo coloridos, `.env.example`, README.

## Próximos passos

1. Conferir e integrar o Bloco 3.
2. Bloco 4: formulário de contato (Supabase + EmailJS). 3. Bloco 5: login e dashboard (escolha definitiva dos destaques). 4. Bloco 6: performance (Lighthouse mobile ≥ 80), README, vídeo.
