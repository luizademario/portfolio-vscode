# AGENTS.md — instruções para a IA neste projeto

Projeto: portfólio pessoal em React com visual inspirado no VS Code (trabalho CP3 da FIAP).
Dono: estudante iniciante de Engenharia de Software. Ele precisa entender e explicar tudo o que for entregue.

> Estas regras são **instruções escritas**. Só são aplicadas automaticamente as verificações listadas em "Definição de pronto" que realmente existirem no repositório.

## Stack aprovada (não mudar sem pedir)
- React + Vite, **JavaScript** (sem TypeScript), React Router, CSS Modules + variáveis CSS.
- Supabase (banco + login), EmailJS (e-mail), TanStack Query (cache do GitHub, a partir do Bloco 3).
- Vitest + Testing Library, ESLint, Prettier. Deploy na Vercel.
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
- Branch por funcionalidade: `feature/...`, `fix/...`, `docs/...`, `chore/...`, `perf/...`; integração à `main` por pull request.
- Commits no padrão Conventional Commits, em português: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `ci:`, `perf:`.
  Exemplo: `feat: adiciona barra de abas com fechamento`.
- Commits só depois de o bloco ser verificado. Nada de push ou publicação sem o dono confirmar.
- Nunca versionar `.env`; manter `.env.example` atualizado.

## Definição de pronto (rodar e informar a saída real)
1. `npm run lint` sem erros.
2. `npm test` passando.
3. `npm run build` concluindo.
4. Teste manual descrito para o dono.
Verificações automáticas **ainda não implantadas**: Prettier, Husky/lint-staged, commitlint e GitHub Actions. Quando entrarem, atualizar esta seção.

## Honestidade
- Não afirmar que testou, publicou ou verificou algo sem evidência. Dizer o que não consegue verificar (ex.: ver o navegador).
- Não inventar projetos, experiências ou resultados do dono. Textos pessoais vêm dele.
- Não alterar arquivos ou dependências além do necessário para o bloco atual.
- Atualizar `docs/decisions.md`, `docs/ai-log.md` e `docs/CONTEXTO-ATUAL.md` ao fim de cada bloco.

## Requisitos obrigatórios da FIAP
Não remover nem ignorar nenhum. Simplificar a implementação é permitido; eliminar o requisito, não.
