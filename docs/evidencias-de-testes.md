# Evidências de Testes

Testes automáticos executados em 07/11/2026. Os testes manuais abaixo precisam ser feitos e documentados (prints) pela equipe.

## Validação W3C (automática)
Nu Html Checker (mesmo motor do validador do W3C) nas 10 páginas HTML e no `css/style.css`: **0 erros e 0 avisos**. Para anexar print: https://validator.w3.org/ → "Validate by File Upload".

## Links e âncoras (automático)
Todos os `href` e `src` locais e âncoras (`#apoie`, `#ods`, `#form-contato`) apontam para arquivos e ids existentes: **0 problemas**.

## Contraste WCAG AA (cálculo)
| Par de cores | Razão | Mínimo |
|---|---|---|
| Texto principal / fundo claro | 15,4:1 | 4,5:1 |
| Texto secundário / branco | 7,1:1 | 4,5:1 |
| Verde escuro (rótulos e links) / fundo claro | 6,0:1 | 4,5:1 |
| Verde claro / fundo escuro | 11,9:1 | 4,5:1 |
| Texto do botão / verde de destaque | 7,1:1 | 4,5:1 |
| Rodapé (texto secundário) / fundo escuro | 5,2:1 | 4,5:1 |
| Erro vermelho / branco | 6,5:1 | 4,5:1 |
| Borda dos campos / branco | 4,9:1 | 3:1 |

## JavaScript (automático, navegador simulado com jsdom)
19 testes OK: envio vazio (mensagem, borda, `aria-invalid`, foco, aviso), nome/e-mail/telefone inválidos, rascunho salvo e restaurado, envio válido (sucesso e rascunho apagado), filtro de notícias, alto contraste, tamanho da fonte e menu no celular. **Nenhum erro de JavaScript nas 10 páginas.**

## Testes manuais (equipe)
- [ ] Site abre pela URL publicada, com HTTPS, no computador e no celular
- [ ] As 10 páginas funcionam online, sem links quebrados
- [ ] Navegação só com Tab e Enter, com foco visível, em todas as páginas
- [ ] Formulário: enviar com erro, ver mensagens, enviar certo, recarregar e ver o rascunho
- [ ] Teste com leitor de tela (NVDA ou TalkBack)
- [ ] Lighthouse (Acessibilidade) no Chrome: anexar print
- [ ] Prints da home no desktop e no celular
