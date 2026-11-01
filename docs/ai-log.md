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
