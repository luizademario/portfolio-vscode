# AGENTS.md — instruções para a IA neste projeto

Projeto: portfólio pessoal em React com visual inspirado no VS Code (trabalho CP3 da FIAP).
Dono e autor: Luiz Ademario, estudante de Engenharia de Software. Ele define os requisitos, participa das decisões, configura os serviços e valida o resultado. A IA é uma ferramenta de apoio: explica conceitos, compara alternativas, escreve e revisa código e testes e ajuda a diagnosticar erros. Tudo o que entra no projeto precisa ser algo que o dono consiga entender e explicar.

> Estas regras são **instruções escritas**. Só são aplicadas automaticamente as verificações listadas em "Definição de pronto" que realmente existirem no repositório.

## Como a IA deve trabalhar com o dono

- Quando a escolha for técnica (biblioteca, arquitetura, serviço), apresentar as alternativas, o que cada uma ganha e perde, e esperar a decisão do dono antes de implementar.
- Explicar de forma que um estudante do 2º semestre consiga reproduzir a explicação depois.
- Dar instruções objetivas e uma etapa por vez para configurar serviços externos; quem configura é o dono.

## Stack aprovada pelo dono (não mudar sem combinar)

- React + Vite, **JavaScript** (sem TypeScript), React Router, CSS Modules + variáveis CSS.
- Supabase (banco + login), EmailJS (e-mail), TanStack Query (cache do GitHub, em uso desde o Bloco 3).
- Vitest + Testing Library, ESLint, Prettier. Deploy na Vercel.
- Testes: Vitest; de tela com Testing Library + jsdom (`// @vitest-environment jsdom` no topo do arquivo). Fixtures da API em `src/test/`.
- Projetos do site: só repositórios públicos, não fork, com o tópico definido em `config/portfolio.js` (D6). Nunca escrever nomes de projetos no código.
- Segredos: só em `.env` (fora do Git). Variáveis `VITE_*` são públicas no navegador: nunca colocar `service_role` nem chaves privadas. Manter `.env.example` igual às variáveis usadas em `src/config/env.js`.
- Formulários: validação em função pura em `src/utils`, lógica em hook, componente só apresenta; botão de envio bloqueado enquanto envia.
- Dashboard: a proteção real é a RLS do banco (`supabase/*.sql`); `RequireAuth` é só navegação. `supabase-js` só é importado por `src/services/supabaseClient.js` (por `import()`), nunca no pacote inicial. Login e dashboard ficam em `React.lazy`. Nunca versionar o UUID do dono.
- Não adicionar dependência sem explicar para que serve e receber aprovação.

## Estrutura e responsabilidades

- `src/pages`: uma página por rota; só junta componentes e hooks.
- `src/components/layout`: moldura (barra de ícones, explorador, abas, barra de status).
- `src/components/ui`: peças genéricas e reutilizáveis (Icon, FileIcon, ThemeToggle, PageContainer...).
- `src/context`: contexto em 3 partes — objeto em `XContext.js`, provedor em `XProvider.jsx`, hook em `src/hooks/useX.js`.
- `src/hooks` e `src/services`: únicos lugares que falam com API, Supabase ou EmailJS.
- `src/config`: dados do portfólio e lista de páginas (`navigation.js` é a fonte única do explorador e das abas).
- `src/utils`: funções puras (com teste ao lado).
- `src/styles/tokens.css`: **todas** as cores e medidas. Nenhum componente usa cor fixa.

**Regra central:** componente visual nunca chama `fetch` nem Supabase.

## Nomes

- Componentes e arquivos de componente: PascalCase (`TabBar.jsx`); CSS Module com o mesmo nome (`TabBar.module.css`).
- Hooks: `useAlgo`. Funções e variáveis: camelCase. Constantes de configuração: camelCase em objeto.
- Texto da interface, comentários e documentação: português do Brasil.
- Estilo: sem ponto e vírgula, aspas simples, 2 espaços (padrão do template).

## Git

- Branch por funcionalidade: `feature/...`, `fix/...`, `docs/...`, `chore/...`, `perf/...`. Trabalho individual: integração à `main` por `git merge --no-ff` (pull request é opcional; decisão D20).
- Commits no padrão Conventional Commits, em português: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `ci:`, `perf:`.
  Exemplo: `feat: adiciona barra de abas com fechamento`.
- Commits só depois de o dono verificar o bloco. Commit, push, merge e publicação são feitos pelo dono; a IA sugere os comandos.
- Finais de linha: LF (`.gitattributes` e Prettier).
- Nunca versionar `.env`; manter `.env.example` atualizado.

## Definição de pronto (rodar e informar a saída real)

1. `npm run lint` sem erros.
2. `npm run format:check` aprovado (`npm run format` corrige).
3. `npm test` passando.
4. `npm run build` concluindo.
5. Teste manual descrito para o dono.
   Automáticas já implantadas: Prettier + ESLint antes de cada commit (Husky + lint-staged) e GitHub Actions (lint, formatação, testes e build a cada push na `main`). A `main` tem regra de proteção no GitHub (bloqueia exclusão e push forçado). **Ainda não implantado:** commitlint.

## Honestidade

- Não afirmar que testou, publicou ou verificou algo sem evidência. Dizer o que não consegue verificar (ex.: ver o navegador).
- Não inventar projetos, experiências ou resultados do dono. Textos pessoais vêm dele.
- Não alterar arquivos ou dependências além do necessário para o bloco atual.
- Ao fim de cada bloco, a IA redige as entradas de `docs/decisions.md`, `docs/ai-log.md` e `docs/CONTEXTO-ATUAL.md` e o dono revisa e completa (principalmente as verificações dele e o campo "o que aprendi").
- No `docs/ai-log.md`, registrar com clareza o que a IA gerou e o que o dono decidiu, configurou e verificou, sem exagerar nem esconder nenhum dos dois.

## Requisitos obrigatórios da FIAP

Não remover nem ignorar nenhum. Simplificar a implementação é permitido; eliminar o requisito, não.
