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

- **Bloco 4 (entregue pela IA, conferido pelo dono em produção):** formulário de contato com validação por campo, esqueleto de envio com spinner e botão bloqueado, salvamento no Supabase (REST) e e-mail pelo EmailJS (REST), anti-spam em camadas, `.env.example`, `supabase/01-contact-messages.sql`. Verificado no ambiente da IA: lint, `format:check`, 88 testes e build.

## Estado do Git

Branches integradas: `feature/layout-shell`, `chore/qualidade`, `fix/formatacao-ci`, `feature/ajuste-visual`. Branches integradas também: `feature/github-api` (confirmar o merge). Próxima branch: `feature/contato` (commit: `feat: adiciona formulário de contato com Supabase e EmailJS`).

- **Bloco 3 (conferido pelo dono, inclusive o erro 403 simulado e os tópicos reais):** API do GitHub com TanStack Query, `RepoList`/`RepoCard`/`RepoCardSkeleton`/`StatusMessage`, página de detalhes pelo cache, destaques provisórios na Home, seção de destaque removida de Sobre.

## Pendências

- `src/config/profile.js`: o dono precisa preencher `name` e revisar as frases (só fatos verdadeiros).
- Commitlint (opcional); repositório público antes da entrega.
- Fonte monoespaçada ainda é a do sistema (decidir no bloco de performance).
- Opcional: barra de menu decorativa, ícones de arquivo coloridos, README.

## Próximos passos

1. Configurar os serviços e conferir o Bloco 4.
2. Bloco 5: login e dashboard (mensagens, marcar como respondida, destaques da Home). Libera leitura e atualização na tabela só para o dono logado.
3. Bloco 6: performance (Lighthouse mobile ≥ 80), README, vídeo. Keep-alive do Supabase no fim (D4).
