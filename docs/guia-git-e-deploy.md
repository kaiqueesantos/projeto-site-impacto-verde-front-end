# Guia de Git e Deploy (GitHub + GitHub Pages)

## 1. Criar o repositório (um integrante)
1. No GitHub: **New repository** → nome `impacto_verde` → **Public** → sem README (o projeto já tem).
2. No terminal, **dentro da pasta `impacto_verde`** (o `index.html` precisa ficar na raiz do repositório):
```
git init
git add .
git commit -m "Adiciona versão inicial do site Impacto Verde"
git branch -M main
git remote add origin https://github.com/USUARIO/impacto_verde.git
git push -u origin main
```
3. Em **Settings → Collaborators**, adicione os outros integrantes (e o professor, se o repositório for privado).

## 2. Fluxo de trabalho de todos (commits, branch e pull request)
```
git clone https://github.com/USUARIO/impacto_verde.git
git checkout -b feature/nome-da-tarefa
# ...edite os arquivos da sua parte...
git add .
git commit -m "Descreve o que foi feito, no passado ou imperativo"
git push -u origin feature/nome-da-tarefa
```
No GitHub, abra o **Pull Request** da sua branch para `main`, peça a revisão de outro integrante e faça o **merge**.

**Sugestão de divisão (cada um faz commits da parte que realmente entende e consegue explicar):**

| Integrante | Branch sugerida | Parte |
|---|---|---|
| 1 | `feature/formulario-js` | Revisar e comentar `js/main.js` (validação e rascunho) |
| 2 | `feature/css-responsivo` | Conferir o layout no celular e ajustar o CSS |
| 3 | `feature/conteudo-ods` | Revisar textos, ODS e dados com fonte |
| 4 | `feature/docs-deploy` | Preencher `docs/`, nomes, RAs e links |

Boas mensagens de commit: "Adiciona filtro de notícias", "Corrige contraste da borda dos campos". Evite "teste" e "ajustes".

## 3. Publicar no GitHub Pages (HTTPS)
1. No repositório: **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**, branch **main** e pasta **/ (root)**. Salve.
3. Aguarde 1 a 2 minutos. O endereço será `https://USUARIO.github.io/impacto_verde/`.
4. Marque **Enforce HTTPS** (se aparecer).
5. Abra a URL **sem estar logado**, no computador e no celular, e teste as 10 páginas.

Atenção: os nomes de arquivos diferenciam maiúsculas de minúsculas no GitHub Pages. Todos os nossos estão em minúsculas.

## 4. Depois de publicar
- Cole a URL e o link do repositório em `docs/README.md` e em `links.txt`.
- Faça commit dessa alteração por Pull Request.
- Gere o `.zip` da mesma versão publicada.
