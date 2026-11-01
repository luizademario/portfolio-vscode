# Contexto atual do projeto (para continuar em outra conversa)

**Projeto:** portfólio CP3 (FIAP), React + Vite + JavaScript, visual VS Code. Entrega: 03/11/2026. Dono: iniciante, quer entender tudo.
**Decisões aprovadas:** `docs/decisions.md`. **Regras para a IA:** `AGENTS.md`. **Referência visual medida:** `docs/referencia-visual.md`.
**Modo de trabalho:** a IA entrega blocos completos (arquivos prontos em zip), explica brevemente e diz como testar. Roda lint, testes e build no ambiente dela e diz o que não conseguiu verificar. Sem push nem publicação sem confirmação do dono. Cada bloco vai para um chat novo; este arquivo e o zip do projeto são a ponte.

## Concluído

- Ambiente (Node 24, npm 11, Git), projeto Vite, repositório no GitHub (`luizademario/portfolio-vscode`, hoje privado: **tornar público antes da entrega**).
- **Blocos 1 e 2** (moldura, abas, tema, Início, Sobre, rota `/projetos/:nome`, Button, TagList) integrados na `main`.
- **Publicação (conferido pelo dono):** Vercel com deploy automático a cada push na `main`; F5 em `/sobre` sem 404.
- **Qualidade (conferido pelo dono):** Prettier, Husky + lint-staged (hook visto funcionando no commit), GitHub Actions verde (CI #2). LF fixado após o CI #1 reprovar por CRLF.
- **Ajuste visual (entregue pela IA, ainda não conferido pelo dono):** paleta escura medida, barra de status escura com contador decorativo, indicador coral, `Breadcrumb`, Home em hero. Verificado no ambiente da IA: lint, `format:check`, 16 testes e build. **Não verificado:** aparência no navegador, celular e tema claro.

## Estado do Git

Branches integradas: `feature/layout-shell`, `chore/qualidade`, `fix/formatacao-ci`. Próxima branch sugerida: `feature/ajuste-visual` (commit: `feat: aplica paleta da referência, breadcrumb e home em hero`).

## Pendências

- Conferir o ajuste visual no navegador (escuro, claro, celular) e ajustar o que destoar.
- `src/config/profile.js`: o dono precisa preencher `name` e revisar as frases (só fatos verdadeiros).
- Regra de proteção da `main` no GitHub (bloquear exclusão e force push); commitlint opcional.
- Home, Projetos e detalhe têm avisos provisórios até o Bloco 3.
- Fonte monoespaçada ainda é a do sistema (decidir no bloco de performance).
- Opcional: barra de menu decorativa, ícones de arquivo coloridos, `.env.example`, README.

## Próximos passos

1. Conferir e integrar o ajuste visual.
2. Bloco 3: API do GitHub (sem forks e sem o repo do portfólio), TanStack Query, skeleton/erro/vazio, detalhe com dados reais. Precisa dos nomes exatos dos repositórios.
3. Bloco 4: formulário de contato (Supabase + EmailJS). 4. Bloco 5: login e dashboard. 5. Bloco 6: performance (Lighthouse mobile ≥ 80), README, vídeo.
