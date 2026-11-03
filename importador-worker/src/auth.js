// Confere o token do login Google do Firebase, sem depender de bibliotecas externas.
const JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';
const KEYS_TTL_MS = 60 * 60 * 1000;
const CLOCK_SKEW_SECONDS = 60;

let cachedKeys = null;
let cachedAt = 0;

export class AuthError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function resetKeyCache() {
  cachedKeys = null;
  cachedAt = 0;
}

function decodeSegment(segment) {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '='));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function decodeJson(segment) {
  return JSON.parse(new TextDecoder().decode(decodeSegment(segment)));
}

async function getPublicKey(kid) {
  if (!cachedKeys || Date.now() - cachedAt > KEYS_TTL_MS || !cachedKeys[kid]) {
    const response = await fetch(JWKS_URL);
    if (!response.ok) throw new AuthError(503, 'Não foi possível validar o login agora.');
    const { keys } = await response.json();
    cachedKeys = Object.fromEntries(keys.map((key) => [key.kid, key]));
    cachedAt = Date.now();
  }

  const jwk = cachedKeys[kid];
  if (!jwk) throw new AuthError(401, 'Login inválido. Entre novamente.');
  return crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
}

async function verifyToken(token, projectId) {
  const parts = String(token).split('.');
  if (parts.length !== 3) throw new AuthError(401, 'Login inválido. Entre novamente.');

  let header;
  let claims;
  try {
    header = decodeJson(parts[0]);
    claims = decodeJson(parts[1]);
  } catch {
    throw new AuthError(401, 'Login inválido. Entre novamente.');
  }
  if (header.alg !== 'RS256' || !header.kid) throw new AuthError(401, 'Login inválido. Entre novamente.');

  const key = await getPublicKey(header.kid);
  const valid = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    key,
    decodeSegment(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
  );
  if (!valid) throw new AuthError(401, 'Login inválido. Entre novamente.');

  const now = Math.floor(Date.now() / 1000);
  const claimsOk = claims.aud === projectId
    && claims.iss === `https://securetoken.google.com/${projectId}`
    && typeof claims.sub === 'string' && claims.sub !== ''
    && claims.exp > now - CLOCK_SKEW_SECONDS
    && claims.iat <= now + CLOCK_SKEW_SECONDS;
  if (!claimsOk) throw new AuthError(401, 'Sua sessão expirou. Entre novamente.');

  return claims;
}

// Exige login Google com e-mail verificado e presente na lista de autorizados.
export async function requireTeacher(request, env) {
  const header = request.headers.get('Authorization') || '';
  if (!header.startsWith('Bearer ')) throw new AuthError(401, 'Faça login para continuar.');

  const claims = await verifyToken(header.slice(7), env.FIREBASE_PROJECT_ID);
  if (claims.firebase?.sign_in_provider !== 'google.com' || claims.email_verified !== true || !claims.email) {
    throw new AuthError(403, 'Use uma conta Google com e-mail verificado.');
  }

  const email = String(claims.email).toLowerCase();
  const allowed = String(env.ALLOWED_EMAILS || '').split(',').map((item) => item.trim().toLowerCase()).filter(Boolean);
  if (!allowed.includes(email)) throw new AuthError(403, 'Sua conta não está autorizada a usar o importador.');

  return { email };
}
