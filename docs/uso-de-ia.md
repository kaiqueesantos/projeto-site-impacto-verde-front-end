# Uso de IA no projeto

**Ferramenta:** Claude (Anthropic), via chat. Usada para gerar e ajustar código, e para explicar o código à equipe.

## Regras e contexto fornecidos à IA
- Tema obrigatório: sustentabilidade e impacto social, com acessibilidade para PcD.
- 10 páginas HTML interligadas, na estrutura de pastas do professor.
- HTML5 semântico, CSS3 e JavaScript; validação no W3C; contraste AA; teclado; `lang="pt-BR"`.
- Código limpo e simples, sem gradientes; **não inventar** dados nem alterar o projeto bruscamente.
- Roteiro e rubrica da 2ª entrega (PDF e planilha) como critério.

## Prompts usados, o que foi aceito e o que foi corrigido

| # | Pedido (resumo) | Aceito | Corrigido / decidido pela equipe |
|---|---|---|---|
| 1 | Criar a página inicial a partir da interface de referência | Estrutura, header, hero, CSS com variáveis | Texto e marca adaptados ao nosso tema |
| 2 | Estruturar as 10 páginas e a pasta do projeto | Esqueleto das páginas e pastas | — |
| 3 | Trocar "EcoTech" por "Impacto Verde" | Troca em todos os arquivos | Logotipo ajustado ("IMPACTO" + "VERDE") |
| 4 | Desenvolver as 10 páginas e explicar o código | Conteúdo, formulário, galeria, mídia | Menu com as 10 páginas em todas as páginas |
| 5 | Simplificar o visual (sem gradientes) | Cores sólidas, sem animações | Depois voltaram transições simples de cor (exigência da 2ª entrega) |
| 6 | Adaptar o projeto à rubrica da 2ª entrega | JS de validação, rascunho, filtro, apoio, ODS, dados com fonte | Dados numéricos conferidos nas fontes (EPE e IBGE) |

**Sugestões avaliadas e não adotadas:** assistente/chatbot no site (opcional no roteiro), para manter o projeto simples. `[a equipe pode acrescentar outras sugestões que recusou e o motivo]`

## Como a IA foi integrada ao projeto
Regras e plano de contexto acima (usados em todos os pedidos) e este registro. Não há assistente de IA dentro do site.

## O que a equipe precisa saber explicar
Todo o código do projeto. Treinem principalmente: `validarCampo` e `mensagemDeErro` (Constraint Validation API), `localStorage` (rascunho e preferências), `preventDefault`, `classList.toggle`, `dataset` e o filtro de notícias.
