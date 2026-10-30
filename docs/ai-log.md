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
