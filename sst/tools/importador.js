import { auth, signInWithGoogle, subscribeToGoogleAuthState } from '../core/js/firebase-config.js';
import {
  findDuplicate,
  isValidLessonNumber,
  lessonId,
  lessonSlug,
  validateLesson
} from '../../importador-worker/src/lesson-validator.js';

const WORKER_URL = 'https://quiz-importador.importador-worker.workers.dev';
const COURSE_URL = '../lessons/course-data.json';
const DRAFT_KEY = 'importador-rascunho';
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const MIN_TEXT_CHARS = 200;
const MAX_TEXT_CHARS = 400000;
const POLL_INTERVAL_MS = 15000;
const POLL_LIMIT_MS = 5 * 60 * 1000;
const TYPE_LABELS = {
  multiple: 'Escolha única',
  boolean: 'Verdadeiro ou falso',
  combo: 'Completar a lacuna',
  multi: 'Múltipla seleção',
  drag: 'Arrastar e relacionar'
};

const $ = (id) => document.getElementById(id);
let lesson = null;
let pollTimer = null;
let publishedSlug = null;
// Fica só na memória de propósito: ao recarregar a página, a exclusão deixa de ser possível.
let deleteToken = null;

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  children.filter(Boolean).forEach((child) => node.append(child));
  return node;
}

function setStatus(node, message, tone = '') {
  node.textContent = message;
  node.className = `status ${tone}`.trim();
  node.hidden = !message;
}

function readDraft() {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY));
  } catch {
    return null;
  }
}

function saveDraft() {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(lesson));
  } catch {
    // Sem armazenamento, a revisão continua funcionando até fechar a página.
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Nada a limpar.
  }
}

async function api(path, options = {}) {
  const user = auth.currentUser;
  if (!user) throw new Error('Sua sessão expirou. Entre novamente.');

  let response;
  try {
    response = await fetch(`${WORKER_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${await user.getIdToken()}`,
        ...(options.body ? { 'Content-Type': 'application/json' } : {})
      }
    });
  } catch {
    throw new Error('Não foi possível falar com o servidor. Verifique a conexão.');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'O servidor recusou o pedido.');
    error.erros = data.erros;
    throw error;
  }
  return data;
}

// ---- Extração de texto no navegador ----
async function extractPdf(file) {
  const pdfjs = await import('./vendor/pdf.min.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdf.worker.min.mjs', import.meta.url).href;
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer(), isEvalSupported: false }).promise;

  const pages = [];
  for (let number = 1; number <= pdf.numPages; number += 1) {
    const page = await pdf.getPage(number);
    const content = await page.getTextContent();
    const text = content.items.map((item) => `${item.str || ''}${item.hasEOL ? '\n' : ' '}`).join('');
    pages.push(text.trim());
  }
  return pages.filter(Boolean).join('\n\n');
}

function loadMammoth() {
  if (window.mammoth) return Promise.resolve(window.mammoth);
  return new Promise((resolve, reject) => {
    const script = el('script', { src: './vendor/mammoth.browser.min.js' });
    script.onload = () => resolve(window.mammoth);
    script.onerror = () => reject(new Error('Não foi possível carregar o leitor de DOCX.'));
    document.head.append(script);
  });
}

async function extractDocx(file) {
  const mammoth = await loadMammoth();
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return result.value.trim();
}

async function extractText(file) {
  const extension = file.name.split('.').pop().toLowerCase();
  if (extension === 'pdf') return extractPdf(file);
  if (extension === 'docx') return extractDocx(file);
  if (extension === 'txt') return (await file.text()).trim();
  throw new Error('Formato não aceito. Use PDF, DOCX ou TXT.');
}

function updateCounter() {
  const count = $('texto').value.trim().length;
  const over = count > MAX_TEXT_CHARS;
  $('contador').textContent = `${count.toLocaleString('pt-BR')} de ${MAX_TEXT_CHARS.toLocaleString('pt-BR')} caracteres${over ? ' — reduza o texto para continuar' : ''}`;
  $('contador').style.color = over ? 'var(--danger)' : '';
}

async function handleFile(event) {
  const [file] = event.target.files || [];
  if (!file) return;
  const status = $('arquivo-status');

  if (file.size > MAX_FILE_BYTES) {
    status.textContent = 'O arquivo passa de 20 MB. Envie um arquivo menor ou cole o texto.';
    return;
  }

  status.textContent = `Extraindo o texto de ${file.name}...`;
  try {
    const text = await extractText(file);
    if (!text) {
      status.textContent = 'Nenhum texto encontrado. Se for um PDF escaneado, cole o texto manualmente.';
      return;
    }
    $('texto').value = text;
    updateCounter();
    status.textContent = `Texto extraído de ${file.name}. Confira abaixo antes de gerar.`;
  } catch (error) {
    console.error('Falha ao extrair o texto:', error);
    status.textContent = error.message.startsWith('Formato') ? error.message : 'Não foi possível ler esse arquivo. Tente outro formato ou cole o texto.';
  }
}

// ---- Geração ----
function readForm() {
  const numero = $('numero').value.trim();
  const nome = $('nome').value.trim();
  const texto = $('texto').value.trim();

  if (!isValidLessonNumber(numero)) throw new Error('Informe um número de aula válido, como 109 ou 23-bonus.');
  if (!nome) throw new Error('Informe o nome da aula.');
  if (texto.length < MIN_TEXT_CHARS) throw new Error('Envie um arquivo ou cole o material da aula, com pelo menos 200 caracteres.');
  if (texto.length > MAX_TEXT_CHARS) throw new Error('O material passou do limite de caracteres. Reduza o texto.');

  return { numero, nome, texto, total: Number($('total').value), nivel: $('nivel').value };
}

// Evita gastar cota do Gemini com uma aula que já existe.
async function checkDuplicate(numero) {
  let course;
  try {
    const response = await fetch(COURSE_URL, { cache: 'no-store' });
    if (!response.ok) return;
    course = await response.json();
  } catch {
    return; // A Action confere de novo antes de gravar.
  }
  const duplicate = findDuplicate(course.lessons || [], lessonSlug(numero), lessonId(numero));
  if (duplicate) throw new Error(`${duplicate} Use outro número de aula.`);
}

async function handleGenerate() {
  const status = $('gerar-status');
  const button = $('btn-gerar');
  button.disabled = true;

  try {
    const body = readForm();
    setStatus(status, 'Conferindo o número da aula...', 'andamento');
    await checkDuplicate(body.numero);
    setStatus(status, 'Gerando as questões com IA. Isso pode levar alguns minutos; mantenha a página aberta.', 'andamento');

    const data = await api('/gerar', { method: 'POST', body: JSON.stringify(body) });
    lesson = data.lesson;
    saveDraft();
    setStatus(status, '');
    showReview();
  } catch (error) {
    setStatus(status, error.message, 'erro');
  } finally {
    button.disabled = false;
  }
}

// ---- Revisão ----
function textField(label, value, onChange, { multiline = false, maxLength } = {}) {
  const input = el(multiline ? 'textarea' : 'input', { value });
  if (!multiline) input.type = 'text';
  if (maxLength) input.maxLength = maxLength;
  input.addEventListener('input', () => {
    onChange(input.value);
    refreshValidation();
  });
  return el('div', {}, el('label', { textContent: label }), input);
}

function optionRow(q, key, index) {
  const isMulti = q.type === 'multi';
  const isFixed = q.type === 'boolean';
  const value = () => q[key][index];
  const isCorrect = () => (isMulti ? q.correct.includes(value()) : q.correct === value());

  const mark = el('input', { type: isMulti ? 'checkbox' : 'radio', name: `q-${lesson.questions.indexOf(q)}`, checked: isCorrect() });
  mark.setAttribute('aria-label', 'Marcar como resposta certa');
  mark.addEventListener('change', () => {
    if (isMulti) {
      q.correct = mark.checked ? [...q.correct, value()] : q.correct.filter((item) => item !== value());
    } else {
      q.correct = value();
    }
    refreshValidation();
  });

  if (isFixed) return el('label', { className: 'opcao' }, mark, el('span', { textContent: value() }));

  const input = el('input', { type: 'text', value: value() });
  input.setAttribute('aria-label', `Opção ${index + 1}`);
  input.addEventListener('input', () => {
    const previous = value();
    q[key][index] = input.value;
    if (isMulti) q.correct = q.correct.map((item) => (item === previous ? input.value : item));
    else if (q.correct === previous) q.correct = input.value;
    refreshValidation();
  });
  return el('div', { className: 'opcao' }, mark, input);
}

function pairRow(q, index) {
  const itemInput = el('input', { type: 'text', value: q.items[index]?.txt ?? '' });
  const zoneInput = el('input', { type: 'text', value: q.zones[index]?.label ?? '' });
  itemInput.setAttribute('aria-label', `Item ${index + 1}`);
  zoneInput.setAttribute('aria-label', `Corresponde a ${index + 1}`);
  itemInput.addEventListener('input', () => {
    q.items[index].txt = itemInput.value;
    refreshValidation();
  });
  zoneInput.addEventListener('input', () => {
    q.zones[index].label = zoneInput.value;
    refreshValidation();
  });
  return el('div', { className: 'par' }, itemInput, zoneInput);
}

function questionCard(q, index) {
  const card = el('article', { className: 'card' });
  card.dataset.index = String(index + 1);
  card.append(
    el('div', { className: 'cabecalho-questao' },
      el('span', { textContent: `Questão ${index + 1}` }),
      el('span', { textContent: TYPE_LABELS[q.type] || q.type })),
    textField('Enunciado', q.questions, (value) => { q.questions = value; }, { multiline: true })
  );

  if (q.type === 'multiple' || q.type === 'boolean' || q.type === 'multi') {
    const hint = q.type === 'multi' ? 'Opções (marque todas as certas)' : 'Opções (marque a certa)';
    card.append(el('label', { textContent: hint }), ...(q.answers || []).map((_, i) => optionRow(q, 'answers', i)));
  } else if (q.type === 'combo') {
    card.append(el('label', { textContent: 'Opções da lacuna (marque a certa)' }), ...(q.options || []).map((_, i) => optionRow(q, 'options', i)));
  } else if (q.type === 'drag') {
    card.append(el('label', { textContent: 'Pares: item e o que corresponde a ele' }), ...(q.items || []).map((_, i) => pairRow(q, i)));
  }

  card.append(textField('Dica mostrada ao aluno', q.tip, (value) => { q.tip = value; }, { multiline: true }));
  return card;
}

function showReview() {
  const info = lesson.lesson_info;
  const data = $('dados-revisao');
  const list = $('questoes');
  data.replaceChildren();
  list.replaceChildren();

  const sokoban = textField('Palavra do Sokoban (4 letras)', (info.sokoban || []).join(''), (value) => {
    info.sokoban = value.trim().toUpperCase().split('');
  }, { maxLength: 4 });
  data.append(
    textField('Título da aula', info.title, (value) => { info.title = value; }),
    sokoban
  );

  (info.topics || []).forEach((topic, i) => {
    data.append(el('div', { className: 'campos-topico' },
      textField(`Tópico ${i + 1}: nome`, topic.name, (value) => { topic.name = value; }),
      textField(`Tópico ${i + 1}: descrição`, topic.desc, (value) => { topic.desc = value; })));
  });

  let currentTopic = null;
  lesson.questions.forEach((q, i) => {
    if (q.topics !== currentTopic) {
      currentTopic = q.topics;
      const topic = (info.topics || []).find((item) => item.id === currentTopic);
      list.append(el('h3', { className: 'grupo-topico', textContent: topic?.name || currentTopic }));
    }
    list.append(questionCard(q, i));
  });

  $('revisado').checked = false;
  $('etapa-rascunho').hidden = true;
  $('etapa-dados').hidden = true;
  $('etapa-material').hidden = true;
  $('etapa-resultado').hidden = true;
  $('etapa-revisao').hidden = false;
  refreshValidation();
  $('etapa-revisao').scrollIntoView();
}

function refreshValidation() {
  const erros = validateLesson(lesson);
  const list = $('erros');
  list.replaceChildren(...erros.map((erro) => el('li', { textContent: erro })));
  list.hidden = erros.length === 0;

  const withError = new Set(erros.map((erro) => erro.match(/^Questão (\d+)/)?.[1]).filter(Boolean));
  document.querySelectorAll('#questoes .card').forEach((card) => {
    card.classList.toggle('com-erro', withError.has(card.dataset.index));
  });

  $('btn-publicar').disabled = erros.length > 0 || !$('revisado').checked;
  saveDraft();
}

function backToForm() {
  lesson = null;
  clearDraft();
  $('etapa-revisao').hidden = true;
  $('etapa-resultado').hidden = true;
  $('etapa-rascunho').hidden = true;
  $('etapa-dados').hidden = false;
  $('etapa-material').hidden = false;
}

// ---- Publicação ----
async function handlePublish() {
  const button = $('btn-publicar');
  button.disabled = true;
  const status = $('resultado-status');

  try {
    const published = await api('/publicar', { method: 'POST', body: JSON.stringify({ lesson }) });
    deleteToken = published.exclusao;
  } catch (error) {
    const details = error.erros?.length ? `\n${error.erros.slice(0, 5).join('\n')}` : '';
    $('etapa-resultado').hidden = false;
    setStatus(status, `${error.message}${details}`, 'erro');
    $('etapa-resultado').scrollIntoView();
    button.disabled = false;
    return;
  }

  const { slug } = lesson;
  $('etapa-revisao').hidden = true;
  $('etapa-resultado').hidden = false;
  setStatus(status, 'Aula enviada. Aguardando a inserção no curso, o que costuma levar 1 a 2 minutos.', 'andamento');
  $('etapa-resultado').scrollIntoView();
  clearDraft();
  watchPublication(slug, Date.now());
}

function watchPublication(slug, startedAt) {
  const status = $('resultado-status');
  pollTimer = setTimeout(async () => {
    try {
      const result = await api(`/publicacao/${slug}`);
      if (result.estado === 'publicada') {
        setStatus(status, 'Aula inserida no curso! O site pode levar mais alguns minutos para atualizar.', 'sucesso');
        publishedSlug = slug;
        $('link-aula').href = `../core/index.html?cod=${encodeURIComponent(slug)}`;
        $('btn-excluir').disabled = false;
        $('btn-excluir').hidden = !deleteToken;
        $('resultado-link').hidden = false;
        $('btn-nova').hidden = false;
        return;
      }
      if (result.estado === 'erro') {
        setStatus(status, `A aula não foi inserida: ${result.mensagem}`, 'erro');
        $('btn-nova').hidden = false;
        return;
      }
    } catch (error) {
      console.error('Falha ao consultar a publicação:', error.message);
    }

    if (Date.now() - startedAt > POLL_LIMIT_MS) {
      setStatus(status, 'A publicação está demorando mais que o normal. Confira o course-data no GitHub antes de tentar de novo.', 'aviso');
      $('btn-nova').hidden = false;
      return;
    }
    watchPublication(slug, startedAt);
  }, POLL_INTERVAL_MS);
}

// ---- Exclusão ----
async function handleDelete() {
  const slug = publishedSlug;
  if (!slug || !deleteToken) return;
  if (!window.confirm(`Excluir a aula ${slug} do curso? Essa ação remove a aula do quiz.`)) return;

  const status = $('resultado-status');
  $('btn-excluir').disabled = true;
  $('btn-nova').hidden = true;

  try {
    await api('/excluir', { method: 'POST', body: JSON.stringify({ slug, exclusao: deleteToken }) });
  } catch (error) {
    setStatus(status, error.message, 'erro');
    $('btn-excluir').disabled = false;
    $('btn-excluir').hidden = error.message.startsWith('Só é possível');
    $('btn-nova').hidden = false;
    return;
  }

  setStatus(status, 'Excluindo a aula do curso, o que costuma levar 1 a 2 minutos.', 'andamento');
  watchDeletion(slug, Date.now());
}

function watchDeletion(slug, startedAt) {
  const status = $('resultado-status');
  pollTimer = setTimeout(async () => {
    try {
      const result = await api(`/exclusao/${slug}`);
      if (result.estado === 'excluida') {
        setStatus(status, 'Aula excluída do curso. O site pode levar mais alguns minutos para atualizar.', 'sucesso');
        publishedSlug = null;
        deleteToken = null;
        $('resultado-link').hidden = true;
        $('btn-nova').hidden = false;
        return;
      }
      if (result.estado === 'erro') {
        setStatus(status, `A aula não foi excluída: ${result.mensagem}`, 'erro');
        $('btn-excluir').disabled = false;
        $('btn-nova').hidden = false;
        return;
      }
    } catch (error) {
      console.error('Falha ao consultar a exclusão:', error.message);
    }

    if (Date.now() - startedAt > POLL_LIMIT_MS) {
      setStatus(status, 'A exclusão está demorando mais que o normal. Confira o course-data no GitHub.', 'aviso');
      $('btn-nova').hidden = false;
      return;
    }
    watchDeletion(slug, startedAt);
  }, POLL_INTERVAL_MS);
}

// ---- Início ----
function showWorkspace(user) {
  $('usuario').textContent = `Conectado como ${user.email}`;
  $('usuario').hidden = false;
  $('etapa-login').hidden = true;
  $('area-trabalho').hidden = false;

  const draft = readDraft();
  if (draft?.lesson_info && !lesson && !pollTimer) {
    $('rascunho-texto').textContent = `Existe uma revisão salva neste navegador: ${draft.lesson_info.title}.`;
    $('etapa-rascunho').hidden = false;
  }
}

$('btn-login').addEventListener('click', async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    console.error('Falha no login:', error?.code);
    $('etapa-login').querySelector('p').textContent = 'Não foi possível entrar. Tente novamente.';
  }
});
$('arquivo').addEventListener('change', handleFile);
$('texto').addEventListener('input', updateCounter);
$('btn-gerar').addEventListener('click', handleGenerate);
$('btn-publicar').addEventListener('click', handlePublish);
$('revisado').addEventListener('change', refreshValidation);
$('btn-gerar-novamente').addEventListener('click', backToForm);
$('btn-excluir').addEventListener('click', handleDelete);
$('btn-nova').addEventListener('click', () => {
  publishedSlug = null;
  deleteToken = null;
  $('resultado-link').hidden = true;
  $('btn-nova').hidden = true;
  $('numero').value = '';
  $('nome').value = '';
  $('texto').value = '';
  $('arquivo').value = '';
  $('arquivo-status').textContent = '';
  updateCounter();
  backToForm();
});
$('btn-retomar').addEventListener('click', () => {
  lesson = readDraft();
  showReview();
});
$('btn-descartar').addEventListener('click', () => {
  clearDraft();
  $('etapa-rascunho').hidden = true;
});

subscribeToGoogleAuthState((user) => {
  if (user) showWorkspace(user);
});
updateCounter();
