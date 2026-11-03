# Registro de uso da IA

Regra: registrar só o que aconteceu de fato. Campos entre [colchetes] são preenchidos pelo dono.

## 2026-10-22 — Bloco 1: moldura estilo VS Code

- **Ferramenta:** Claude (chat). **Modelo:** [anotar o nome que aparece no seletor].
- **Instruções usadas:** [anotar se o AGENTS.md foi colado no Project ou na conversa].
- **O que a IA fez:** gerou os arquivos do Bloco 1 (barra de ícones, explorador, abas fecháveis, barra de status, tema claro/escuro, rotas básicas, 404) e a lógica testável das abas.
- **Verificações feitas pela IA no ambiente dela (não na máquina do dono):** `npm run lint` sem saída de erro; `npm test` com 10 testes passando; `npm run build` concluído; um teste de integração descartável (jsdom, não incluído no repositório) com 4 cenários — abrir/ativar/fechar abas, link direto com 404, alternar tema.
- **Não verificado pela IA:** aparência no navegador, responsividade real, contraste, comportamento no celular.
- **Verificações do dono:** [colar aqui o resultado do lint, dos testes e do teste manual].
- **Corrigido durante o trabalho:** [anotar erros que aparecerem e como foram resolvidos].
- **O que aprendi / sei explicar:** [responder com as suas palavras].

### Publicação, qualidade e ajuste visual (30–31/10/2026)

**Pedido:** publicar na Vercel com deploy automático, automatizar qualidade e aplicar a referência visual.
**O que a IA fez:** conduziu push, merge e Vercel em etapas; gerou Prettier, Husky, lint-staged e o workflow de CI; depois da falha do CI #1 diagnosticou o final de linha e propôs LF; aplicou paleta, barra de status escura, breadcrumb e home em hero.

- **Verificações da IA (ambiente dela):** lint, format:check, 16 testes e build passando; lint-staged testado em repositório temporário.
- **Não verificado pela IA:** aparência no navegador, celular, tema claro, proteção da main.
- **Verificações do dono:** deploy automático e F5 em /sobre sem 404, CI #2 verde, hook do Husky no commit. [colar o resultado do teste manual do ajuste visual]
- **Corrigido durante o trabalho:** CI #1 reprovou 7 arquivos no format:check por CRLF do Windows; corrigido com LF (.gitattributes + Prettier). Um bloco lint-staged duplicado entrou no package.json e o arquivo .lintstagedrc.json foi removido.
- **O que aprendi / sei explicar:** [escrever com as suas palavras]

### Bloco 3: integração com a API do GitHub (31/10/2026)

**Pedido:** listar só repositórios públicos, sem fork, com o tópico "portfolio", usando TanStack Query, com skeleton, erro, lista vazia, detalhe e destaques na Home; remover o destaque de Sobre.
**O que a IA fez:** service com erros tipados, filtro no cliente, hooks sobre uma chave de cache única, RepoCard/RepoCardSkeleton/RepoList/StatusMessage, detalhe lendo do cache, destaques provisórios, remoção do destaque em Sobre, correção do repoName.

- **Verificações da IA (ambiente dela):** lint, format:check, 52 testes (17 repositórios simulados) e build passando.
- **Não verificado pela IA:** a resposta real da API (limite de requisições no ambiente dela, então não confirmou que `topics` vem na listagem), o visual no navegador e no celular.
- **Verificações do dono:** [colar: o comando do topics, a tela de projetos, o detalhe com F5, o erro offline]
- **O que aprendi / sei explicar:** [escrever com as suas palavras]

### Bloco 4: formulário de contato (31/10/2026)

**Pedido:** formulário com validação por campo, Supabase, EmailJS, anti-spam e testes.
**O que a IA fez:** validateContact (função pura), antiSpam, contactService (REST), useContactForm, ContactForm/FormField/Spinner, SQL com RLS só de inserção, .env.example, decisões D32–D38.

- **Verificações da IA (ambiente dela):** lint, format:check, 88 testes e build passando.
- **Não verificado pela IA:** Supabase e EmailJS reais, visual no navegador.
- **Verificações do dono:** [colar: envio real, linha na tabela, e-mail recebido, erros de validação]
- **O que aprendi / sei explicar:** [escrever com as suas palavras]

### Bloco 5: login e dashboard (31/10/2026)

**Pedido:** login com Supabase Auth, rota /dashboard protegida, mensagens com "marcar como respondida", escolha dos destaques da Home, testes de acesso.
**O que a IA fez:** serviços de auth/dashboard/destaques, RequireAuth, LoginForm, MessageList, FeaturedPicker, páginas Login e Dashboard em React.lazy, SQL com site_owner e is_owner() e RLS, decisões D39–D46.

- **Verificações da IA (ambiente dela):** lint, format:check, 149 testes e build passando; pacote inicial ~102 kB gzip.
- **Não verificado pela IA:** Supabase Auth real, políticas RLS reais, visual no navegador.
- **Verificações do dono:** [colar: login, dashboard sem login, marcar respondida, destaques na Home, teste de RLS]
- **O que aprendi / sei explicar:** [escrever com as suas palavras]
