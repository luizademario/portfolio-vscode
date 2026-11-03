# Portfólio estilo VS Code

Site de portfólio pessoal com a aparência do editor Visual Studio Code: barra de ícones, explorador de arquivos, abas, breadcrumb e barra de status. Os projetos são carregados direto do GitHub, e o site tem formulário de contato e uma área restrita para o dono ver as mensagens e escolher os projetos em destaque.

Projeto individual de **Luiz Ademario Soares De Oliveira Filho** ([@luizademario](https://github.com/luizademario)), estudante de Engenharia de Software na FIAP, desenvolvido para o trabalho CP3.

- **Site publicado:** https://portfolio-vscode-mu.vercel.app/
- **Repositório:** https://github.com/luizademario/portfolio-vscode

## Funcionalidades

- **Visual de editor de código:** barra de ícones, explorador de arquivos, abas que podem ser abertas e fechadas, breadcrumb e barra de status.
- **Tema claro e escuro:** a escolha fica salva no navegador e é aplicada antes da primeira pintura da página, para não "piscar".
- **Páginas:** Início (apresentação), Sobre, Projetos, Contato e uma página 404 amigável. Cada projeto tem endereço próprio (`/projetos/nome-do-repositorio`), e o link abre direto na página certa, inclusive ao atualizar o navegador.
- **Projetos do GitHub:** a lista vem da API do GitHub, sem cadastro manual. Aparecem só os repositórios públicos, que não são fork e que têm o tópico `portfolio`. Cada card mostra descrição, linguagem e data da última atualização. A página de cada projeto mostra mais dados do repositório.
- **Carregamento, erro e lista vazia:** todo dado que vem de API mostra esqueleto enquanto carrega, mensagem de erro com botão "Tentar de novo" (inclusive para o limite de requisições da API do GitHub) e aviso de lista vazia.
- **Formulário de contato:** validação por campo com mensagem específica, botão bloqueado durante o envio e aviso de sucesso ou erro. A mensagem é salva no Supabase e enviada por e-mail pelo EmailJS. Há proteções simples contra envio automático: campo escondido para robôs, tempo mínimo de preenchimento e intervalo de 60 segundos entre envios.
- **Dashboard do dono:** acesso protegido por login (Supabase Auth). Quem não está logado é redirecionado para `/login`. No dashboard o dono lê as mensagens recebidas, marca como respondida e escolhe quais projetos aparecem em destaque na Home.
- **Destaques na Home:** mostram os projetos marcados no dashboard. Se nenhum estiver marcado, ou se o banco não responder, a Home mostra os primeiros projetos da lista.
- **Carregamento sob demanda:** as páginas de login e dashboard e a biblioteca do Supabase só são baixadas por quem entra nelas.
- **Layout responsivo**, com cores e medidas centralizadas em variáveis CSS (`src/styles/tokens.css`) e componentes reaproveitados (botão, card, campo de formulário, mensagem de status).

## Tecnologias

| Área          | O que foi usado                                                               |
| ------------- | ----------------------------------------------------------------------------- |
| Base          | JavaScript (sem TypeScript), React 19, Vite 8                                 |
| Rotas         | React Router 7                                                                |
| Estilo        | CSS Modules e variáveis CSS                                                   |
| Dados e cache | TanStack Query 5, API REST do GitHub                                          |
| Back-end      | Supabase (banco PostgreSQL com RLS e Supabase Auth, `supabase-js` 2), EmailJS |
| Testes        | Vitest 5, Testing Library e jsdom                                             |
| Qualidade     | ESLint 10, Prettier 3, Husky 9 e lint-staged 17                               |
| Publicação    | Vercel (deploy), GitHub Actions (verificação automática)                      |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 24 (versão usada no desenvolvimento e na verificação automática) e npm.
- [Git](https://git-scm.com/).
- Para usar o formulário de contato e o dashboard: um projeto no [Supabase](https://supabase.com/) e uma conta no [EmailJS](https://www.emailjs.com/), configurados como descrito abaixo. Sem eles o site abre e lista os projetos, mas o contato e o login avisam que não estão configurados.

## Instalação e execução

```bash
git clone https://github.com/luizademario/portfolio-vscode.git
cd portfolio-vscode
npm install
```

Crie o arquivo `.env` a partir do exemplo (veja a próxima seção) e inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O site abre em `http://localhost:5173`.

### Scripts

| Comando                | O que faz                                 |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento      |
| `npm run build`        | Gera a versão de produção na pasta `dist` |
| `npm run preview`      | Serve a versão de produção localmente     |
| `npm run lint`         | Verifica o código com o ESLint            |
| `npm run format`       | Formata os arquivos com o Prettier        |
| `npm run format:check` | Confere a formatação sem alterar arquivos |
| `npm test`             | Roda os testes automatizados uma vez      |
| `npm run test:watch`   | Roda os testes e repete a cada alteração  |

## Variáveis de ambiente

Copie o arquivo de exemplo e preencha com os seus valores:

```bash
cp .env.example .env
```

No Windows (PowerShell): `Copy-Item .env.example .env`.

O `.env` não vai para o Git (está no `.gitignore`). O `.env.example` mostra os nomes das variáveis, sem valores.

| Variável                   | Para que serve                                      | Onde encontrar                                  |
| -------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| `VITE_SUPABASE_URL`        | Endereço do projeto no Supabase                     | Supabase: Project Settings, Data API / API Keys |
| `VITE_SUPABASE_ANON_KEY`   | Chave **pública** do Supabase (publishable ou anon) | Supabase: Project Settings, API Keys            |
| `VITE_EMAILJS_SERVICE_ID`  | Serviço de e-mail do EmailJS                        | EmailJS: Email Services                         |
| `VITE_EMAILJS_TEMPLATE_ID` | Modelo do e-mail enviado                            | EmailJS: Email Templates                        |
| `VITE_EMAILJS_PUBLIC_KEY`  | Chave pública do EmailJS                            | EmailJS: Account, General                       |

As variáveis que começam com `VITE_` ficam visíveis no navegador. Use apenas chaves públicas e **nunca** coloque a chave `service_role` ou `secret` do Supabase.

### Configuração do Supabase

1. Crie um projeto no Supabase e copie a URL e a chave pública para o `.env`.
2. No **SQL Editor**, rode o arquivo `supabase/01-contact-messages.sql`. Ele cria a tabela de mensagens e deixa o visitante apenas inserir.
3. Em **Authentication, Users**, crie o usuário do dono (e-mail e senha) e copie o **User UID** dele.
4. Em **Authentication**, desligue a opção de novos cadastros públicos.
5. No **SQL Editor**, rode `supabase/02-dashboard.sql`, trocando `COLE-AQUI-O-UUID-DO-DONO` pelo User UID. Faça a troca só no editor do Supabase e não salve o arquivo com o seu UID. Esse arquivo cria a tabela dos destaques e as políticas de segurança (RLS) que deixam só o dono ler e atualizar as mensagens.

### Configuração do EmailJS

1. Em **Email Services**, conecte a conta de e-mail que vai receber os avisos.
2. Em **Email Templates**, crie um modelo que use as variáveis `{{from_name}}`, `{{reply_to}}` e `{{message}}`, que são as enviadas pelo site.
3. Copie o Service ID, o Template ID e a Public Key para o `.env`.

## Estrutura do projeto

```
.
├── public/               Arquivos estáticos (favicon)
├── supabase/             SQL das tabelas e das políticas de segurança
├── src/
│   ├── pages/            Uma página por rota; juntam componentes e hooks
│   ├── components/
│   │   ├── layout/       Moldura do editor: barra de ícones, explorador, abas, breadcrumb, barra de status
│   │   ├── ui/           Peças reutilizáveis: botão, campo de formulário, spinner, mensagem de status...
│   │   ├── repos/        Cards e lista de projetos (esqueleto, erro, vazio)
│   │   ├── contact/      Formulário de contato
│   │   ├── auth/         Formulário de login e proteção de rota
│   │   └── dashboard/    Lista de mensagens e escolha dos destaques
│   ├── hooks/            Lógica de tela e acesso a dados (TanStack Query)
│   ├── services/         Chamadas ao GitHub, Supabase e EmailJS
│   ├── utils/            Funções puras (validações, formatação, regras), com testes ao lado
│   ├── context/          Tema e abas abertas
│   ├── config/           Dados do portfólio, regras do formulário, variáveis de ambiente, lista de páginas
│   ├── routes/           Definição das rotas
│   ├── styles/           Variáveis de cor e medida (tokens.css) e estilos globais
│   └── test/             Dados simulados e apoio para os testes
├── .github/workflows/    Verificação automática (CI)
├── .husky/               Verificação antes de cada commit
├── vercel.json           Redirecionamento das rotas para o index.html
└── .env.example          Nomes das variáveis de ambiente
```

**Critério de divisão:** componentes visuais só recebem dados e mostram na tela. Quem fala com o GitHub, o Supabase ou o EmailJS são os arquivos de `services` e de `hooks`. Funções puras ficam em `utils` e são testadas isoladamente.

## Decisões técnicas

Estas escolhas foram discutidas e aprovadas durante o desenvolvimento, comparando alternativas:

- **React, Vite e JavaScript, em vez de TypeScript e Next.js:** o projeto é um site individual com rotas no navegador e não precisa de renderização no servidor. Manter a stack simples também facilita entender e explicar cada parte.
- **API do GitHub com o tópico `portfolio`:** os projetos aparecem sem cadastro manual. Para um repositório entrar ou sair do site basta adicionar ou remover o tópico no GitHub.
- **TanStack Query:** guarda o resultado por 10 minutos, então navegar entre páginas não repete a requisição à API, e já entrega os estados de carregamento e erro.
- **Contato com Supabase e EmailJS, salvando antes de enviar o e-mail:** o banco é a fonte da verdade. Se o e-mail falhar, a mensagem continua salva e aparece no dashboard.
- **Supabase Auth e RLS para proteger o dashboard:** o redirecionamento de quem não está logado melhora a navegação, mas a proteção real dos dados está nas políticas do banco, que só liberam a leitura e a atualização das mensagens para o dono.
- **Separação entre o público e o administrativo:** login e dashboard ficam em rotas carregadas sob demanda, e a biblioteca do Supabase só é baixada nelas. O visitante comum não carrega esse código.
- **Git com uma branch por funcionalidade e merge local, sem pull request:** por ser um projeto individual, as branches são integradas à `main` com `git merge --no-ff`. O histórico ainda mostra a branch de cada funcionalidade.

## Deploy

O site está publicado na Vercel: https://portfolio-vscode-mu.vercel.app/

- A Vercel está conectada ao repositório do GitHub. Cada push na branch `main` gera uma nova publicação automaticamente.
- O `vercel.json` redireciona todas as rotas para o `index.html`, o que permite atualizar a página (F5) ou abrir um link direto em qualquer rota.
- As cinco variáveis de ambiente da seção anterior também estão cadastradas no painel da Vercel (**Settings, Environment Variables**). Elas só entram no site na hora da construção, então depois de alterar uma é preciso fazer um novo deploy.
- O GitHub Actions (`.github/workflows/ci.yml`) roda lint, verificação de formatação, testes e build em cada push na `main` e em pull requests.
- A branch `main` tem uma regra de proteção no GitHub que impede a exclusão e o push forçado.

## Padrões de desenvolvimento

**Commits:** padrão Conventional Commits, com a mensagem em português: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `ci:` e `perf:`. Exemplo: `feat: adiciona formulário de contato com Supabase e EmailJS`.

**Branches:** uma por funcionalidade, com os prefixos `feature/`, `fix/`, `docs/`, `chore/` e `perf/` (por exemplo, `feature/dashboard`). Depois de verificada, a branch é integrada à `main` com `git merge --no-ff`.

**Nomenclatura:**

- Componentes e seus arquivos em PascalCase (`TabBar.jsx`), com o CSS Module de mesmo nome (`TabBar.module.css`).
- Hooks começam com `use` (`useContactForm`). Funções e variáveis em camelCase.
- Texto da interface, comentários e documentação em português do Brasil.

**Estilo de código:** sem ponto e vírgula, aspas simples, 2 espaços de recuo e linhas de até 100 caracteres, definido no Prettier. Todas as cores e medidas vêm de `src/styles/tokens.css`; nenhum componente usa cor fixa.

**Verificação automática:** antes de cada commit, o Husky roda o lint-staged, que aplica o ESLint e o Prettier nos arquivos do commit. No GitHub, o CI repete lint, formatação, testes e build.

**Testes:** os testes ficam ao lado do código (`*.test.js` e `*.test.jsx`) e cobrem, entre outros pontos, a validação dos formulários, o bloqueio do dashboard para quem não está logado, os estados de carregamento, erro e lista vazia, o filtro dos projetos do GitHub e a ausência de requisições repetidas entre páginas. As regras de segurança do banco (RLS) não têm teste automatizado: foram conferidas manualmente.

## Uso de ferramentas de IA

Usei ferramentas de IA como apoio durante o desenvolvimento, principalmente o Claude, pela interface de chat, e também o ChatGPT para tirar dúvidas, discutir decisões e organizar etapas. A IA ajudou a explicar conceitos, a sugerir e discutir soluções, a escrever parte do código, dos testes e das configurações, a identificar erros e a revisar o que foi feito.

A proposta e os requisitos do projeto foram definidos por mim. As decisões técnicas foram discutidas durante o desenvolvimento, com apoio da IA na comparação de alternativas. Avaliei e aprovei as soluções utilizadas. Também configurei os serviços externos (GitHub, Vercel, Supabase e EmailJS), integrei as alterações ao projeto, executei testes, verifiquei o funcionamento no navegador e estudei os conceitos envolvidos para conseguir explicar o que foi construído.

## Observações

- **Lista de projetos:** a API do GitHub é consultada sem autenticação (limite de 60 requisições por hora por IP) e só os 100 primeiros repositórios da conta são lidos, sem paginação. O cache e a mensagem de limite atingido reduzem o impacto, mas não eliminam o limite.
- **Dashboard:** não apaga mensagens; para isso é preciso usar o painel do Supabase. O dono é identificado por uma tabela própria no banco, e o UID dele não é versionado.
- **Anti-spam:** as proteções do formulário funcionam no navegador e não impedem quem chama a API do Supabase diretamente. O limite do plano gratuito do EmailJS limita o pior caso.
- **Supabase gratuito:** projetos do plano gratuito são pausados depois de cerca de uma semana com pouca atividade. Ainda não há uma rotina automática para evitar isso; se o projeto pausar, é preciso retomá-lo pelo painel do Supabase.
- **Commits:** o padrão de mensagem é seguido por convenção; não há verificação automática (como commitlint).
- **Lighthouse (mobile, na versão publicada):** desempenho 100, acessibilidade 100, boas práticas 100 e SEO 91. Os apontamentos restantes ficam como melhorias futuras opcionais: arquivo `robots.txt`, recursos que bloqueiam a renderização, tamanho do DOM e JavaScript não utilizado.
- **Melhorias futuras possíveis:** paginação da lista de projetos, rotina de keep-alive do Supabase, opção de apagar mensagens pelo dashboard e elementos 3D ou imagens na Home.
