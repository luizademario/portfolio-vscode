# Decisões técnicas

| # | Decisão | Alternativas descartadas | Motivo | Limitação conhecida |
|---|---|---|---|---|
| D1 | Supabase (banco + login) | Firebase, backend Node | SQL, Auth e RLS prontos e gratuitos | Projeto gratuito pausa por inatividade |
| D2 | EmailJS | Edge Function + Resend, Formspree | Funciona direto do front, simples | Sem restrição de domínio no plano gratuito, cota pequena. Não é segurança de produção |
| D3 | Salvar a mensagem no banco antes do e-mail | E-mail primeiro | O banco é a fonte da verdade | Se o e-mail falhar, o dono só vê no dashboard |
| D4 | Keep-alive do Supabase só no fim | Fazer no início | Não atrasa os obrigatórios | Não é garantia absoluta |
| D5 | Tema escuro na primeira visita; botão alterna e salva | Seguir o tema do sistema | Fidelidade à referência | Quem usa sistema claro vê escuro na 1ª visita |
| D6 | Listar repositórios sem forks e sem o do portfólio | Mostrar tudo | Só trabalhos próprios | Só os 100 primeiros repositórios |
| D7 | Somente Claude (navegador/app) | Copilot, Claude Code | Preferência e simplicidade | Limites do plano gratuito |
| D8 | Abas fecháveis desde o início | Abas fixas | Fidelidade à referência | Estado em memória, não persiste |
| D9 | JavaScript, React + Vite | TypeScript, Next.js | Menos risco no prazo | Sem checagem de tipos, sem SSR |
| D10 | Abas como `nav` + links com `aria-current` | `role="tablist"` | Cada aba navega para uma URL; é o semântico correto | — |
| D11 | Estado das abas = lista de caminhos num `useReducer` puro (testado); aba ativa vem da URL; a aba é aberta durante a renderização quando o caminho muda | `useEffect` para abrir abas | Evita reabrir por engano uma aba recém-fechada | Padrão menos comum, comentado no código |
| D12 | Ícones em SVG próprios, sem biblioteca | lucide, react-icons | Zero dependência e sem dúvida de licença | Poucos ícones |
| D13 | Paleta provisória baseada em Dark+/Light+ do VS Code | — | Ajustar com as capturas da referência | Cores podem mudar |
| D14 | Contexto em 3 arquivos (`.js`, `.jsx`, hook) | Tudo num arquivo | Regra `react-refresh` do ESLint e organização | Mais arquivos |
| D15 | `vercel.json` com rewrite para `index.html` | — | Link direto e refresh em qualquer rota | — |
| D16 | Conteúdo pessoal em `src/config/profile.js`, só com fatos informados pelo dono | Texto fixo dentro das páginas | Um lugar para editar; nada inventado | Nome e frases precisam de revisão do dono |
| D17 | Rota `/projetos/:nome` já existe, com aba própria; os dados do repositório chegam no Bloco 3 | Criar a rota só junto com a API | Link direto, refresh e abas ficam prontos e testados | Página mostra aviso provisório |
| D18 | Título da aba do navegador por página (`usePageTitle`) | Título fixo | Clareza e acessibilidade | — |

## Pendências do setup (decididas, ainda não feitas)
Prettier, Husky + lint-staged, GitHub Actions (lint, teste, build), proteção da `main`, conexão com a Vercel, remote do GitHub.
