import { Buffer } from 'node:buffer';
import { AuthError, requireTeacher } from './auth.js';
import { GeminiError, buildLesson, generateQuiz } from './gemini.js';
import { ALLOWED_TOTALS, LEVELS, isValidLessonNumber, validateLesson } from './lesson-validator.js';

const MAX_BODY_BYTES = 1000000;
const MAX_TEXT_CHARS = 400000;
const MIN_TEXT_CHARS = 200;
const MAX_NAME_CHARS = 150;
const QUEUE_DIR = '.importador/fila';
const ERRORS_DIR = '.importador/erros';
const PUBLISHED_DIR = '.importador/publicadas';
const DELETE_DIR = '.importador/exclusao';
const SLUG_PATTERN = 'aula-[a-z0-9]+(?:-[a-z0-9]+)*';
const DELETE_WINDOW_MS = 30 * 60 * 1000;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map((item) => item.trim());
  if (!origin || !allowed.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin'
  };
}

async function readJson(request) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > MAX_BODY_BYTES) throw new HttpError(413, 'O conteúdo enviado é grande demais.');

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new HttpError(413, 'O conteúdo enviado é grande demais.');

  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, 'Pedido inválido.');
  }
}

async function githubFetch(env, path, init = {}) {
  return fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'quiz-importador',
      ...(init.body ? { 'Content-Type': 'application/json' } : {})
    }
  });
}

async function handleGenerate(request, env, teacher) {
  if (env.LIMITE_GERACAO) {
    const { success } = await env.LIMITE_GERACAO.limit({ key: teacher.email });
    if (!success) throw new HttpError(429, 'Muitas gerações em pouco tempo. Aguarde um minuto.');
  }

  const body = await readJson(request);
  const numero = body?.numero;
  const nome = String(body?.nome ?? '').trim();
  const texto = String(body?.texto ?? '').trim();
  const total = Number(body?.total);
  const nivel = body?.nivel;

  if (!isValidLessonNumber(numero)) throw new HttpError(400, 'Informe um número de aula válido, como 109 ou 23-bonus.');
  if (!nome || nome.length > MAX_NAME_CHARS) throw new HttpError(400, `Informe o nome da aula, com até ${MAX_NAME_CHARS} caracteres.`);
  if (!ALLOWED_TOTALS.includes(total)) throw new HttpError(400, 'Quantidade de questões inválida.');
  if (!LEVELS.includes(nivel)) throw new HttpError(400, 'Nível de dificuldade inválido.');
  if (texto.length < MIN_TEXT_CHARS) throw new HttpError(400, 'O material é curto demais para gerar questões.');
  if (texto.length > MAX_TEXT_CHARS) throw new HttpError(413, `O material passa de ${MAX_TEXT_CHARS} caracteres. Envie um trecho menor.`);

  const generated = await generateQuiz({ total, nivel, nome, texto }, env);
  const lesson = buildLesson(generated, { numero, nome });
  return Response.json({ lesson, erros: validateLesson(lesson) });
}

function deleteKey(env) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(env.DELETE_TOKEN_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function deleteMessage(slug, email, expires) {
  return new TextEncoder().encode(`${slug}|${email}|${expires}`);
}

// Autorização entregue uma única vez, ao publicar. Ela fica só na memória da página:
// sem ela não há exclusão, então recarregar a página encerra a possibilidade de excluir.
async function createDeleteToken(slug, email, env) {
  const expires = Date.now() + Number(env.DELETE_WINDOW_MS ?? DELETE_WINDOW_MS);
  const signature = await crypto.subtle.sign('HMAC', await deleteKey(env), deleteMessage(slug, email, expires));
  return `${expires}.${Buffer.from(signature).toString('base64url')}`;
}

async function isDeleteTokenValid(token, slug, email, env) {
  const [expires, signature, ...rest] = String(token ?? '').split('.');
  if (rest.length || !/^\d+$/.test(expires ?? '') || !signature) return false;
  if (Number(expires) <= Date.now()) return false;

  return crypto.subtle.verify(
    'HMAC',
    await deleteKey(env),
    Buffer.from(signature, 'base64url'),
    deleteMessage(slug, email, expires)
  );
}

async function handlePublish(request, env, teacher) {
  const body = await readJson(request);
  const lesson = body?.lesson;
  const erros = validateLesson(lesson);
  if (erros.length) return Response.json({ ok: false, erros }, { status: 422 });

  const exclusao = await createDeleteToken(lesson.slug, teacher.email, env);

  const content = Buffer.from(`${JSON.stringify(lesson, null, 2)}\n`, 'utf8').toString('base64');
  const response = await githubFetch(env, `${QUEUE_DIR}/${lesson.slug}.json`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Importador: coloca ${lesson.slug} na fila de publicação`,
      content,
      branch: env.PUBLISH_BRANCH
    })
  });

  if (response.status === 422 || response.status === 409) {
    throw new HttpError(409, 'Essa aula já está na fila de publicação.');
  }
  if (!response.ok) {
    console.error('GitHub recusou a publicação:', response.status);
    throw new HttpError(502, 'Não foi possível enviar a aula ao GitHub. Tente novamente.');
  }

  return Response.json({ ok: true, slug: lesson.slug, exclusao }, { status: 202 });
}

async function handleDelete(request, env, teacher) {
  const body = await readJson(request);
  const slug = String(body?.slug ?? '');
  if (!new RegExp(`^${SLUG_PATTERN}$`).test(slug)) throw new HttpError(400, 'Aula inválida.');
  if (!await isDeleteTokenValid(body?.exclusao, slug, teacher.email, env)) {
    throw new HttpError(403, 'Só é possível excluir a aula logo após publicá-la, nesta mesma página.');
  }

  const ref = `?ref=${encodeURIComponent(env.PUBLISH_BRANCH)}`;
  const published = await githubFetch(env, `${PUBLISHED_DIR}/${slug}.json${ref}`);
  if (published.status === 404) throw new HttpError(403, 'Só é possível excluir aulas publicadas pelo importador.');
  if (!published.ok) {
    console.error('GitHub falhou ao conferir a aula:', published.status);
    throw new HttpError(502, 'Não foi possível conferir a aula agora. Tente novamente.');
  }

  const response = await githubFetch(env, `${DELETE_DIR}/${slug}.json`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Importador: pede a exclusão de ${slug}`,
      content: Buffer.from(`${JSON.stringify({ slug })}\n`, 'utf8').toString('base64'),
      branch: env.PUBLISH_BRANCH
    })
  });

  if (response.status === 422 || response.status === 409) {
    throw new HttpError(409, 'A exclusão dessa aula já está em andamento.');
  }
  if (!response.ok) {
    console.error('GitHub recusou a exclusão:', response.status);
    throw new HttpError(502, 'Não foi possível pedir a exclusão. Tente novamente.');
  }

  return Response.json({ ok: true, slug }, { status: 202 });
}

async function handleStatus(slug, env, queueDir, finalState) {
  const ref = `?ref=${encodeURIComponent(env.PUBLISH_BRANCH)}`;

  const queued = await githubFetch(env, `${queueDir}/${slug}.json${ref}`);
  if (queued.ok) return Response.json({ estado: 'fila' });

  const failed = await githubFetch(env, `${ERRORS_DIR}/${slug}.json${ref}`);
  if (failed.ok) {
    const file = await failed.json();
    const details = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'));
    return Response.json({ estado: 'erro', mensagem: details.erro });
  }

  if (queued.status !== 404 || failed.status !== 404) {
    console.error('GitHub falhou ao consultar a fila:', queued.status, failed.status);
    throw new HttpError(502, 'Não foi possível consultar a publicação agora.');
  }
  return Response.json({ estado: finalState });
}

async function route(request, env) {
  const { pathname } = new URL(request.url);

  if (pathname === '/health' && request.method === 'GET') {
    return Response.json({ ok: true });
  }

  const statusMatch = pathname.match(new RegExp(`^/(publicacao|exclusao)/(${SLUG_PATTERN})$`));
  const isGenerate = pathname === '/gerar' && request.method === 'POST';
  const isPublish = pathname === '/publicar' && request.method === 'POST';
  const isDelete = pathname === '/excluir' && request.method === 'POST';
  const isStatus = Boolean(statusMatch) && request.method === 'GET';
  if (!isGenerate && !isPublish && !isDelete && !isStatus) throw new HttpError(404, 'Rota não encontrada.');

  const teacher = await requireTeacher(request, env);
  if (isGenerate) return handleGenerate(request, env, teacher);
  if (isPublish) return handlePublish(request, env, teacher);
  if (isDelete) return handleDelete(request, env, teacher);
  return statusMatch[1] === 'publicacao'
    ? handleStatus(statusMatch[2], env, QUEUE_DIR, 'publicada')
    : handleStatus(statusMatch[2], env, DELETE_DIR, 'excluida');
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    let response;
    try {
      response = await route(request, env);
    } catch (error) {
      if (error instanceof HttpError || error instanceof AuthError || error instanceof GeminiError) {
        response = Response.json({ ok: false, error: error.message }, { status: error.status });
      } else {
        console.error('Erro inesperado:', error?.name);
        response = Response.json({ ok: false, error: 'Erro inesperado. Tente novamente.' }, { status: 500 });
      }
    }

    const headers = new Headers(response.headers);
    Object.entries(cors).forEach(([key, value]) => headers.set(key, value));
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Cache-Control', 'no-store');
    return new Response(response.body, { status: response.status, headers });
  }
};
