# Contexto atual do projeto (para continuar em outra conversa)

**Projeto:** portfólio CP3 (FIAP), React + Vite + JavaScript, visual VS Code. Entrega: 03/11/2026. Dono: iniciante, quer entender tudo.
**Decisões aprovadas:** `docs/decisions.md`. **Regras para a IA:** `AGENTS.md`. **Referência visual medida:** `docs/referencia-visual.md`.
**Modo de trabalho:** a IA entrega blocos completos (arquivos prontos em zip), explica brevemente e diz como testar. Roda lint, testes e build no ambiente dela e diz o que não conseguiu verificar. Sem push nem publicação sem confirmação do dono. Cada bloco vai para um chat novo; este arquivo e o zip do projeto são a ponte.

## Concluído e conferido pelo dono (26/10)

- Ambiente (Node 24, npm 11, Git), projeto Vite, repositório ligado ao GitHub (`origin`).
- **Bloco 1** (moldura: barra de ícones, explorador, abas fecháveis, barra de status, tema, rotas, vercel.json) e **Bloco 2** (Início, Sobre, rota `/projetos/:nome` com aba, Button, TagList, título da página).
- No computador do dono: `npm run lint` sem erros, `npm test` com 13 testes passando, `npm run dev` funcionando, interface conferida no navegador.

## Estado do Git

Alterações dos Blocos 1 e 2 estavam **sem commit**. Commits sugeridos na branch `feature/layout-shell`: `docs: adiciona AGENTS.md e documentação do projeto` e `feat: adiciona moldura estilo VS Code, páginas e rota de projeto`. Confirmar com `git log --oneline`. Nenhum push feito ainda.

## Pendências

- **Ajuste visual** pela referência (paleta, barra de status escura, destaque coral, breadcrumb, home em formato hero): ver `docs/referencia-visual.md`.
- **Publicação e qualidade:** push, pull request, Vercel (deploy automático), Prettier, Husky + lint-staged, GitHub Actions (lint, teste, build), proteção da `main`.
- `src/config/profile.js`: o dono precisa preencher `name` e revisar as frases (só fatos verdadeiros); campos com TODO.
- Home, Projetos e detalhe têm avisos provisórios até o Bloco 3.
- Fonte monoespaçada ainda é a do sistema (decidir no bloco de performance).
- O repositório se chama `Portif-lio-vscode`; se renomear, mudar `repoName` em `src/config/portfolio.js`.

## Próximos passos

1. Ajuste visual + publicação inicial (Vercel, Prettier, Husky, CI).
2. Bloco 3: API do GitHub (sem forks e sem o repo do portfólio), TanStack Query, skeleton/erro/vazio, detalhe com dados reais. Precisa dos nomes exatos dos repositórios.
3. Bloco 4: formulário de contato (Supabase + EmailJS). 4. Bloco 5: login e dashboard. 5. Bloco 6: performance (Lighthouse mobile ≥ 80), README, vídeo.
