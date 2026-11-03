# Contexto atual do projeto (para continuar em outra conversa)

**Projeto:** portfólio CP3 (FIAP), React + Vite + JavaScript, visual VS Code. Entrega: 03/11/2026. Dono: iniciante, quer entender tudo.
**Decisões aprovadas:** `docs/decisions.md`. **Regras para a IA:** `AGENTS.md`. **Referência visual medida:** `docs/referencia-visual.md`.
**Modo de trabalho:** a IA entrega blocos completos (arquivos prontos em zip), explica brevemente e diz como testar. Roda lint, testes e build no ambiente dela e diz o que não conseguiu verificar. Sem push nem publicação sem confirmação do dono. Cada bloco vai para um chat novo; este arquivo e o zip do projeto são a ponte.

## Concluído

- Ambiente (Node 24, npm 11, Git), projeto Vite, repositório no GitHub (`luizademario/portfolio-vscode`, hoje privado: **tornar público antes da entrega**).
- **Blocos 1 e 2** (moldura, abas, tema, Início, Sobre, rota `/projetos/:nome`, Button, TagList) integrados na `main`.
- **Publicação (conferido pelo dono):** Vercel com deploy automático a cada push na `main`; F5 em `/sobre` sem 404.
- **Qualidade (conferido pelo dono):** Prettier, Husky + lint-staged (hook visto funcionando no commit), GitHub Actions verde. LF fixado após o CI #1 reprovar por CRLF. Regra de proteção da `main` criada (bloqueia exclusão e force push).
- **Ajuste visual (conferido pelo dono):** paleta escura medida, barra de status escura com contador decorativo, indicador coral, `Breadcrumb`, Home em hero.
- **Bloco 3 (conferido pelo dono, inclusive o erro 403 simulado e os tópicos reais):** API do GitHub com TanStack Query, `RepoList`/`RepoCard`/`RepoCardSkeleton`/`StatusMessage`, página de detalhes pelo cache, destaques provisórios na Home (repositórios com o tópico `portfolio`), seção de destaque removida de Sobre.
- **Bloco 4 (conferido pelo dono em produção):** formulário de contato com validação por campo, spinner e botão bloqueado, salvamento no Supabase (REST) e e-mail pelo EmailJS (REST), anti-spam em camadas. Tabela `contact_messages` com RLS: o visitante só insere; a consulta pública devolve HTTP 200 e `[]` mesmo com mensagens salvas. Variáveis na Vercel configuradas.
- **Bloco 5 (conferido pelo dono):** login com Supabase Auth (`/login`, cadastro público desligado), `/dashboard` protegido (`RequireAuth`), lista de mensagens com "marcar como respondida", escolha dos destaques da Home (tabela `featured_projects`) e políticas RLS ligadas ao dono (`supabase/02-dashboard.sql`, UUID do dono só no Supabase). Rotas e `supabase-js` carregados sob demanda (pacote inicial ~102 kB gzip). O dono confirmou o acesso sem login, o login, as mensagens, os destaques, o sair e os testes de segurança com a chave pública.
- Verificação automática atual: lint, `format:check`, 149 testes e build passando.

## Estado do Git

Branches integradas na `main`: `feature/layout-shell`, `chore/qualidade`, `fix/formatacao-ci`, `feature/ajuste-visual`, `feature/github-api`, `feature/contato`. Branches integradas também: `feature/dashboard` (confirmar o merge e o CI verde). Próxima branch: `feature/performance-readme` (Bloco 6).

## Pendências

- Apagar as mensagens de teste da tabela `contact_messages` pelo painel do Supabase (o dashboard não apaga, D43).
- `src/config/profile.js`: o dono precisa preencher `name` e revisar as frases (só fatos verdadeiros).
- Commitlint (opcional); repositório público antes da entrega.
- Fonte monoespaçada ainda é a do sistema (decidir no bloco de performance).
- Opcional: barra de menu decorativa, ícones de arquivo coloridos, README.

## Próximos passos

1. Bloco 6, em partes: (a) medir o Lighthouse mobile na URL publicada e corrigir o que ficar abaixo de 80; (b) conferir imagens, saltos de layout e requisições repetidas; (c) README completo; (d) checklist da FIAP item a item; (e) keep-alive do Supabase (D4); (f) roteiro do vídeo.
2. Antes da entrega (03/11): repositório público, preencher `name` em `profile.js`, apagar mensagens de teste, conferir o histórico de commits e o `.env.example`.
