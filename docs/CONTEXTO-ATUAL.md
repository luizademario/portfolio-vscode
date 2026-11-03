# Estado atual do projeto

**Projeto:** portfólio CP3 (FIAP) de Luiz Ademario, em React + Vite + JavaScript, com visual de VS Code. Entrega: 03/11/2026.
**Documentos relacionados:** decisões técnicas em `docs/decisions.md`; instruções para a ferramenta de IA em `AGENTS.md`; registro do uso de IA em `docs/ai-log.md`; referência visual medida em `docs/referencia-visual.md`.

## Como o projeto está sendo desenvolvido

Desenvolvimento individual, em blocos, com apoio de IA (Claude pelo chat e, para dúvidas, ChatGPT). A IA ajuda a esclarecer conceitos, comparar alternativas, escrever código e testes, diagnosticar erros e revisar soluções. Os requisitos e as decisões são do dono do projeto, que também configura os serviços (GitHub, Vercel, Supabase e EmailJS), integra as alterações no Git, roda as verificações e testa o funcionamento no navegador. Nada é publicado sem o dono. O que a IA gerou e o que o dono fez em cada etapa está em `docs/ai-log.md`.

## Concluído

- Ambiente (Node 24, npm 11, Git), projeto Vite e repositório no GitHub (`luizademario/portfolio-vscode`, hoje privado: **tornar público antes da entrega**).
- **Blocos 1 e 2** (moldura, abas, tema, Início, Sobre, rota `/projetos/:nome`, Button, TagList): conferidos pelo dono e integrados na `main`.
- **Publicação (conferido pelo dono):** Vercel com deploy automático a cada push na `main`; F5 em `/sobre` sem 404.
- **Qualidade (conferido pelo dono):** Prettier, Husky + lint-staged (hook visto funcionando no commit) e GitHub Actions verde. Os finais de linha foram fixados em LF depois que o primeiro CI reprovou por CRLF. A regra de proteção da `main` foi criada (bloqueia exclusão e push forçado).
- **Ajuste visual (conferido pelo dono):** paleta escura medida, barra de status escura com contador decorativo, indicador coral, `Breadcrumb` e Home em hero.
- **Bloco 3 (conferido pelo dono):** API do GitHub com TanStack Query, `RepoList`, `RepoCard`, `RepoCardSkeleton` e `StatusMessage`, página de detalhes lendo do cache, destaques provisórios na Home (repositórios com o tópico `portfolio`) e seção de destaque removida de Sobre. O dono verificou os tópicos reais e simulou o erro 403 de limite de requisições no navegador.
- **Bloco 4 (conferido pelo dono em produção):** formulário de contato com validação por campo, spinner e botão bloqueado, salvamento no Supabase (REST), e-mail pelo EmailJS (REST) e anti-spam em camadas. A tabela `contact_messages` tem RLS: o visitante só insere, e a consulta pública devolve HTTP 200 e `[]` mesmo com mensagens salvas. As variáveis de ambiente estão configuradas na Vercel.
- **Bloco 5 (conferido pelo dono):** login com Supabase Auth (`/login`, cadastro público desligado), `/dashboard` protegido (`RequireAuth`), lista de mensagens com "marcar como respondida", escolha dos destaques da Home (tabela `featured_projects`) e políticas RLS ligadas ao dono (`supabase/02-dashboard.sql`, com o UUID do dono só no Supabase). Rotas e `supabase-js` são carregados sob demanda (pacote inicial de cerca de 102 kB gzip). O dono confirmou o acesso sem login, o login, as mensagens, os destaques, o sair e os testes de segurança com a chave pública.
- **Lighthouse mobile na versão publicada (medido pelo dono):** desempenho 100, acessibilidade 100, boas práticas 100 e SEO 91. FCP 0,8 s, LCP 0,8 s, TBT 20 ms, CLS 0 e Speed Index 1,1 s. O dono decidiu não priorizar os apontamentos secundários (`robots.txt`, recursos que bloqueiam a renderização, tamanho do DOM e JavaScript não utilizado) e registrá-los como melhorias futuras.
- **README:** reescrito com a descrição real do projeto, da configuração e do uso de ferramentas de IA.
- **Verificação automática (última execução no ambiente da IA):** lint, `format:check`, 149 testes e build passando.

## Estado do Git

A branch `feature/dashboard` aparece como integrada à `origin/main` no Git. Falta apenas conferir no GitHub se a execução mais recente do CI terminou com sucesso.

## Pendências

- Confirmar que o README e o `profile.js` (com o `name`) foram commitados e integrados na `main`.
- Apagar as mensagens de teste da tabela `contact_messages` pelo painel do Supabase (o dashboard não apaga, D43).
- Tornar o repositório público antes da entrega.
- Imagem na seção principal da Home e `robots.txt`: planejados, ainda não feitos.
- Checklist da FIAP comparando com o enunciado, avaliação do keep-alive do Supabase (D4) e roteiro do vídeo.
- Revisar as frases de `src/config/profile.js` (só fatos verdadeiros).
- Opcional: commitlint, barra de menu decorativa, ícones de arquivo coloridos e fonte monoespaçada própria.

## Próximos passos

1. Fechar o Bloco 6: imagem da Home e `robots.txt` (se o dono confirmar), checklist da FIAP, keep-alive (D4) e roteiro do vídeo.
2. Antes da entrega: repositório público, histórico de commits conferido, `.env.example` presente no repositório e `.env` fora do Git.
