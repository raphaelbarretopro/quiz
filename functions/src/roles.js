const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { logger } = require('firebase-functions');
const { auth } = require('./admin');

// E-mails autorizados a se auto-promoverem a admin na primeira execução,
// antes de existir qualquer admin no sistema. Configurar em functions/.env
// (ver functions/.env.example) — nunca commitar e-mails reais aqui.
function getBootstrapAdminEmails() {
  return String(process.env.BOOTSTRAP_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

// Callable: grantAdminRole({ targetEmail? })
//
// Dois caminhos possíveis:
//   1) Bootstrap: quem chama tem e-mail na allowlist BOOTSTRAP_ADMIN_EMAILS e
//      não passou targetEmail (ou passou o próprio e-mail) -> vira admin.
//   2) Promoção: quem chama já é admin (custom claim role=admin) e informa
//      targetEmail de outra conta -> essa conta vira admin.
//
// Depois de concedida, a claim só aparece em request.auth.token após o
// cliente forçar um refresh do ID token (getIdToken(true)) ou relogar.
exports.grantAdminRole = onCall(async (request) => {
  const callerAuth = request.auth;
  if (!callerAuth || !callerAuth.token?.email) {
    throw new HttpsError('unauthenticated', 'É preciso estar logado com Google para esta operação.');
  }

  const callerEmail = String(callerAuth.token.email).toLowerCase();
  const callerIsAdmin = callerAuth.token.role === 'admin';
  const targetEmail = String(request.data?.targetEmail || callerEmail).toLowerCase();

  const bootstrapEmails = getBootstrapAdminEmails();
  const isBootstrapSelfPromotion = !callerIsAdmin && targetEmail === callerEmail && bootstrapEmails.includes(callerEmail);

  if (!callerIsAdmin && !isBootstrapSelfPromotion) {
    throw new HttpsError(
      'permission-denied',
      'Só um admin existente pode conceder este papel (ou o e-mail precisa estar na allowlist de bootstrap).'
    );
  }

  const targetUser = await auth.getUserByEmail(targetEmail);
  const nextClaims = { ...(targetUser.customClaims || {}), role: 'admin' };
  await auth.setCustomUserClaims(targetUser.uid, nextClaims);

  logger.info('grantAdminRole', { grantedBy: callerEmail, targetEmail, bootstrap: isBootstrapSelfPromotion });

  return { ok: true, uid: targetUser.uid, email: targetEmail, requiresTokenRefresh: true };
});
