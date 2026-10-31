# Referência visual (vscode-portfolio.vercel.app)

Medido em 26/10/2026 a partir de uma captura de tela da referência (pixels amostrados).
Valores aproximados: compressão e escala da imagem podem alterar o tom em 1–2 níveis.
A área do hero tem um brilho radial; por isso o fundo varia (#24292e nas bordas, #282b2f perto do centro).

## Paleta escura medida

| Elemento | Referência | Projeto hoje (Dark+) |
|---|---|---|
| Fundo do editor / aba ativa / breadcrumb | #24292e | #1e1e1e |
| Explorador e faixa de abas | #1f2428 | #252526 |
| Barra de ícones | #24292e | #333333 |
| Barra de status | #24292e (escura, igual ao fundo) | #007acc (azul) |
| Linha divisória (explorador/conteúdo) | #161a1d | #3c3c3c |
| Destaque (botão principal, cargo, indicador ativo da barra de ícones) | #f9826c (coral) | #4fc1ff (azul) |
| Botão secundário | #2f3236 | transparente com borda |
| Texto principal | #efefef | #d4d4d4 |
| Texto secundário | #9e9fa1 | #9d9d9d |

Não dá para medir pela captura: cor de aba inativa, cor de hover, tema claro. Decidir ao ajustar.

## Diferenças de estrutura e comportamento observadas

1. Barra de ícones com o mesmo tom do editor e indicador ativo **coral**, ícones maiores.
2. Barra de status **escura**, com contador de erros/avisos (`0 0`) e itens à direita.
3. **Breadcrumb** abaixo das abas (`portfolio > home.tsx`).
4. Barra de menu e título da janela no topo (File, Edit, View…): opcional, só no desktop.
5. **Home em formato hero**, centralizada: "HELLO, I'M", nome grande, cargo em coral, divisor, descrição, botão principal (coral) + secundário, links GitHub / Contact no rodapé.
6. Ícones de arquivo coloridos (glifos); hoje usamos etiquetas de texto.

## Plano do ajuste (um bloco, sem mudar a arquitetura)

- `tokens.css`: trocar a paleta escura pelos valores acima; criar `--on-accent` e `--bg-button`; o botão principal deixa de usar `--bg-status`.
- Barra de status: fundo escuro, borda superior fina, sem azul.
- Breadcrumb: componente novo sob as abas, lendo `getTabInfo`.
- Home: layout hero com os textos de `src/config/profile.js` (nada inventado).
- Opcional depois: barra de menu decorativa, ícones SVG de arquivo, tema claro compatível.
