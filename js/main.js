/* =========================================================
   Impacto Verde — main.js
   Funções:
   1. Menu responsivo (celular)
   2. Preferências de acessibilidade (tamanho da fonte e alto contraste)
   3. Filtro de notícias por categoria
   4. Formulário de contato: validação, mensagens de erro e rascunho
   5. Botão "Copiar chave Pix"
   O site continua navegável sem JavaScript (melhoria progressiva).
   ========================================================= */

/* ---------- 1. Menu responsivo ---------- */
const botaoMenu = document.getElementById('navToggle');
const menu = document.getElementById('menu-principal');

if (botaoMenu && menu) {
  botaoMenu.addEventListener('click', function () {
    // toggle: adiciona a classe "open" se não existe e remove se existe
    const aberto = menu.classList.toggle('open');
    // avisa o leitor de tela se o menu está aberto ou fechado
    botaoMenu.setAttribute('aria-expanded', String(aberto));
  });
}

/* ---------- 2. Preferências de acessibilidade ---------- */
const raiz = document.documentElement;

// Lê o que foi salvo no localStorage e aplica ao carregar qualquer página
function aplicarPreferencias() {
  const tamanho = localStorage.getItem('tamanhoFonte');
  if (tamanho) raiz.style.fontSize = tamanho + '%';
  if (localStorage.getItem('altoContraste') === 'sim') {
    document.body.classList.add('alto-contraste');
  }
}
aplicarPreferencias();

// Muda o tamanho da fonte de 10 em 10%, entre 80% e 150%
function mudarFonte(passo) {
  const atual = parseInt(localStorage.getItem('tamanhoFonte') || '100', 10);
  const novo = Math.min(150, Math.max(80, atual + passo));
  localStorage.setItem('tamanhoFonte', novo);
  raiz.style.fontSize = novo + '%';
}

const botaoMais = document.getElementById('fonte-mais');
const botaoMenos = document.getElementById('fonte-menos');
const botaoContraste = document.getElementById('alto-contraste');

if (botaoMais) botaoMais.addEventListener('click', () => mudarFonte(10));
if (botaoMenos) botaoMenos.addEventListener('click', () => mudarFonte(-10));

if (botaoContraste) {
  botaoContraste.setAttribute('aria-pressed', document.body.classList.contains('alto-contraste'));
  botaoContraste.addEventListener('click', function () {
    const ativo = document.body.classList.toggle('alto-contraste');
    localStorage.setItem('altoContraste', ativo ? 'sim' : 'nao');
    botaoContraste.setAttribute('aria-pressed', ativo);
  });
}

/* ---------- 3. Filtro de notícias ---------- */
const botoesFiltro = document.querySelectorAll('[data-filtro]');
const noticias = document.querySelectorAll('[data-categoria]');
const statusFiltro = document.getElementById('filtro-status');

botoesFiltro.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const filtro = botao.dataset.filtro;
    let visiveis = 0;

    noticias.forEach(function (noticia) {
      const mostrar = filtro === 'todas' || noticia.dataset.categoria === filtro;
      noticia.hidden = !mostrar;          // atributo hidden esconde o elemento
      if (mostrar) visiveis++;
    });

    // marca visualmente (e para leitores de tela) qual filtro está ativo
    botoesFiltro.forEach(b => b.setAttribute('aria-pressed', String(b === botao)));
    statusFiltro.textContent = visiveis + (visiveis === 1 ? ' notícia exibida.' : ' notícias exibidas.');
  });
});

/* ---------- 4. Formulário de contato ---------- */
const form = document.getElementById('form-contato');

// Campos cujo conteúdo é salvo como rascunho (a caixa de aceite não é salva)
const CAMPOS_RASCUNHO = ['nome', 'email', 'telefone', 'nascimento', 'participantes', 'assunto', 'mensagem'];
const CHAVE_RASCUNHO = 'rascunhoContato';

// Devolve o texto do erro de um campo, ou '' se o campo está válido.
// Usa a Constraint Validation API: o navegador calcula o "validity" a partir
// dos atributos HTML (required, type, pattern, min, max, minlength...).
function mensagemDeErro(campo) {
  const v = campo.validity;
  if (v.valid) return '';
  if (v.valueMissing) {
    return campo.type === 'checkbox' ? 'Marque esta opção para continuar.' : 'Preencha este campo.';
  }
  if (v.typeMismatch) return 'Digite um e-mail válido, como nome@exemplo.com.';
  if (v.patternMismatch) return campo.title || 'Formato inválido.';
  if (v.tooShort) return 'Digite pelo menos ' + campo.minLength + ' caracteres.';
  if (v.rangeUnderflow || v.rangeOverflow) {
    return 'Digite um número entre ' + campo.min + ' e ' + campo.max + '.';
  }
  return 'Valor inválido.';
}

// Mostra ou limpa o erro de um campo (texto + borda vermelha + ARIA)
function validarCampo(campo) {
  const erro = document.getElementById('erro-' + campo.id);
  const mensagem = mensagemDeErro(campo);
  erro.textContent = mensagem;
  campo.classList.toggle('invalido', mensagem !== '');   // borda em destaque
  campo.setAttribute('aria-invalid', String(mensagem !== ''));
  return mensagem === '';
}

function salvarRascunho() {
  const dados = {};
  CAMPOS_RASCUNHO.forEach(id => { dados[id] = document.getElementById(id).value; });
  localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
  document.getElementById('form-rascunho').textContent = 'Rascunho salvo neste navegador.';
}

function restaurarRascunho() {
  const salvo = localStorage.getItem(CHAVE_RASCUNHO);
  if (!salvo) return;
  try {
    const dados = JSON.parse(salvo);
    CAMPOS_RASCUNHO.forEach(id => {
      if (dados[id] !== undefined) document.getElementById(id).value = dados[id];
    });
    document.getElementById('form-rascunho').textContent = 'Rascunho anterior recuperado.';
  } catch (e) {
    localStorage.removeItem(CHAVE_RASCUNHO);   // dado corrompido: descarta
  }
}

if (form) {
  const campos = form.querySelectorAll('input, select, textarea');
  const status = document.getElementById('form-status');

  restaurarRascunho();

  campos.forEach(function (campo) {
    // valida ao sair do campo e corrige o erro assim que o usuário digita certo
    campo.addEventListener('blur', () => validarCampo(campo));
    campo.addEventListener('input', function () {
      if (campo.classList.contains('invalido')) validarCampo(campo);
    });
  });

  // salva o rascunho a cada alteração
  form.addEventListener('input', salvarRascunho);
  form.addEventListener('change', salvarRascunho);

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();          // não deixa o navegador enviar/recarregar
    status.textContent = '';

    let primeiroInvalido = null;
    campos.forEach(function (campo) {
      if (!validarCampo(campo) && !primeiroInvalido) primeiroInvalido = campo;
    });

    if (primeiroInvalido) {
      status.textContent = 'Corrija os campos destacados e envie novamente.';
      status.classList.add('erro-geral');
      primeiroInvalido.focus();       // leva o teclado ao primeiro erro
      return;
    }

    // Sem servidor: apenas confirmamos o envio e limpamos tudo
    status.classList.remove('erro-geral');
    status.textContent = 'Mensagem enviada com sucesso! Responderemos em até 2 dias úteis.';
    localStorage.removeItem(CHAVE_RASCUNHO);
    form.reset();
    document.getElementById('form-rascunho').textContent = '';
  });
}

/* ---------- 5. Copiar chave Pix ---------- */
const botaoPix = document.getElementById('copiar-pix');

if (botaoPix) {
  botaoPix.addEventListener('click', function () {
    const chave = document.getElementById('chave-pix').textContent;
    const aviso = document.getElementById('pix-status');
    // clipboard só existe em páginas seguras (HTTPS); por isso o try/catch
    navigator.clipboard.writeText(chave)
      .then(() => { aviso.textContent = 'Chave copiada!'; })
      .catch(() => { aviso.textContent = 'Não foi possível copiar. Selecione e copie manualmente.'; });
  });
}
