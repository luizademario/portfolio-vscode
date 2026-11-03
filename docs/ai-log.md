# Registro de uso da IA

Este projeto foi proposto e conduzido por mim, com apoio de ferramentas de IA durante o desenvolvimento, inclusive na geração de código.

**Ferramentas:** Claude (Anthropic), pela interface de chat, como ferramenta principal. ChatGPT, para tirar dúvidas, discutir decisões e organizar etapas.

**Divisão de responsabilidades:**

- **Minha:** a proposta, as funcionalidades e os requisitos; a escolha entre alternativas técnicas, depois de entender as vantagens e limitações de cada uma; os pedidos de ajuste conforme eu avaliava o resultado; a configuração dos serviços externos (GitHub, Vercel, Supabase e EmailJS); a aplicação das alterações no projeto e o acompanhamento do Git e do deploy; os testes, a verificação no navegador e a identificação do que precisava de correção; o estudo dos conceitos para conseguir explicar o projeto.
- **Da IA:** apoio na comparação de alternativas, na explicação de conceitos, na escrita de código, de testes, de configurações e de SQL, no diagnóstico de erros e na revisão de soluções.

**Regra do registro:** só anotar o que aconteceu de fato.

## 2026-10-22: Bloco 1, moldura estilo VS Code

- **Ferramenta:** Claude (chat).
- **O que a IA fez:** gerou os arquivos do Bloco 1 (barra de ícones, explorador, abas fecháveis, barra de status, tema claro/escuro, rotas básicas e página 404) e a lógica testável das abas.
- **Verificações feitas pela IA no ambiente dela (não na minha máquina):** `npm run lint` sem erros; `npm test` com 10 testes passando; `npm run build` concluído; um teste de integração descartável (jsdom, fora do repositório) com 4 cenários: abrir, ativar e fechar abas, link direto com 404 e alternar o tema.
- **Não verificado pela IA:** aparência no navegador, responsividade real, contraste e comportamento no celular.

## Bloco 2: páginas, rota de projeto e componentes

- **O que a IA fez:** gerou as páginas Início e Sobre, a rota `/projetos/:nome` com aba própria e os componentes Button e TagList. Este bloco foi feito em outra conversa, e o registro detalhado das verificações da IA não foi guardado.
- **Minhas verificações:** conferi o resultado e integrei o bloco na `main`.

## Publicação, qualidade e ajuste visual

- **O que eu fiz:** configurei a conexão do repositório com a Vercel (deploy automático a cada push na `main`), fiz os merges locais, apliquei os arquivos de qualidade em uma branch própria, criei a regra de proteção da `main` no GitHub e conferi o resultado no navegador. Decidi trabalhar sem pull request, por ser um projeto individual (D20), e passei a referência visual (capturas e cores medidas).
- **O que a IA fez:** orientou as etapas de Git e Vercel, gerou os arquivos de Prettier, Husky, lint-staged e do workflow do GitHub Actions, diagnosticou a falha do CI a partir do log que enviei e gerou o ajuste visual (paleta, barra de status escura, breadcrumb e Home em hero).
- **Verificações da IA (ambiente dela):** lint, `format:check`, 16 testes e build passando; o lint-staged foi testado num repositório temporário. Não verificou o Husky na minha máquina, o CI no GitHub, a Vercel nem o visual no navegador.
- **Minhas verificações:** deploy automático funcionando; F5 em `/sobre` sem erro 404; o hook do Husky rodando no commit; CI verde depois da correção; regra de proteção da `main` criada; ajuste visual conferido no navegador.
- **Corrigido durante o trabalho:** o primeiro CI reprovou 7 arquivos no `format:check` por causa dos finais de linha do Windows (CRLF). Foi corrigido fixando LF no Prettier e com `.gitattributes`. Um bloco `lint-staged` apareceu duplicado no `package.json`, e o arquivo `.lintstagedrc.json` foi removido.

## Bloco 3: integração com a API do GitHub

- **O que eu decidi:** mostrar apenas repositórios públicos, que não são fork, com o tópico `portfolio`, sem nomes de projetos no código (substituiu a D6); tirar a seção de destaque da página Sobre (D31); adicionar o tópico nos dois repositórios que devem aparecer.
- **O que a IA fez:** escreveu o serviço do GitHub com erros tipados, o filtro, os hooks com TanStack Query, os componentes de cards (esqueleto, erro e lista vazia), a página de detalhes lendo do cache, os destaques provisórios na Home, a remoção do destaque em Sobre, a correção do `repoName` e os testes.
- **Verificações da IA (ambiente dela):** lint, `format:check`, 52 testes (com 17 repositórios simulados) e build passando. Não conseguiu consultar a API real, porque o limite de requisições do ambiente dela estava esgotado.
- **Minhas verificações:** rodei o comando no PowerShell para confirmar que o campo `topics` vem na listagem, adicionei o tópico nos dois repositórios, conferi o site no navegador e simulei o erro 403 de limite de requisições pelo Console do navegador, com recuperação ao tentar de novo.

## Bloco 4: formulário de contato

- **O que eu decidi:** o formulário com validação por campo, o uso de Supabase e EmailJS e salvar a mensagem no banco antes de enviar o e-mail (D3 e D35).
- **O que a IA fez:** escreveu a validação (função pura), as proteções contra envio automático, o serviço de envio, o hook e os componentes do formulário, o SQL da tabela com RLS, o `.env.example`, as decisões D32 a D38 e os testes.
- **Verificações da IA (ambiente dela):** lint, `format:check`, 88 testes e build passando. Não testou o Supabase nem o EmailJS reais.
- **O que eu fiz:** criei o projeto no Supabase, rodei o SQL, configurei o EmailJS e conectei o Gmail, preenchi o `.env` e as variáveis na Vercel, integrei o bloco e testei em produção.
- **Minhas verificações:** validação dos campos e mensagens de erro na tela; erro de envio com o navegador offline; mensagem salva no Supabase e e-mail recebido; teste de segurança com a chave pública, que devolveu HTTP 200 e `[]` mesmo com mensagens salvas.
- **Corrigido durante o trabalho:** o teste do serviço do Gmail no EmailJS deu o erro 412. Segui as orientações para reconectar a conta com a permissão de envio e o problema foi resolvido.

## Bloco 5: login e dashboard

- **O que eu decidi:** login por e-mail e senha com um único usuário e cadastro público desligado, rotas de login e dashboard carregadas sob demanda, e a escolha dos destaques da Home pelo dashboard (D39 a D46).
- **O que a IA fez:** escreveu os serviços de autenticação, mensagens e destaques, a proteção de rota, os formulários e componentes, as páginas Login e Dashboard, o SQL com o dono do site e as políticas RLS, as decisões D39 a D46 e os testes.
- **Verificações da IA (ambiente dela):** lint, `format:check`, 149 testes e build passando; o pacote inicial ficou em cerca de 102 kB gzip. Não testou o Supabase Auth real nem as políticas RLS reais.
- **O que eu fiz:** criei o usuário do dono no Supabase, desliguei o cadastro público, rodei o SQL trocando o UUID só no editor do Supabase, testei no navegador e integrei o bloco.
- **Minhas verificações:** conferi no navegador o acesso ao dashboard sem login, o fluxo de login, a lista de mensagens, a opção de marcar como respondida, os destaques da Home e o logout. Também verifiquei as consultas ao banco utilizando a chave pública.

## README e documentação

- **O que eu fiz:** informei a URL publicada e o meu nome, descrevi como usei a IA (conceitos, implementação, diagnóstico de erros e revisão) e medi o Lighthouse mobile na versão publicada (desempenho 100, acessibilidade 100, boas práticas 100 e SEO 91). Decidi não priorizar os apontamentos secundários do Lighthouse e registrá-los como melhorias futuras.
- **O que a IA fez:** analisou o repositório (`package.json`, scripts, estrutura, variáveis de ambiente e convenções) e escreveu o README e a revisão destes documentos internos a partir das minhas informações.
