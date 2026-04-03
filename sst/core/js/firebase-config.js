import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import {
    GoogleAuthProvider,
    getAuth,
    getRedirectResult,
    onAuthStateChanged,
    signInWithPopup,
    signInWithRedirect
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: 'AIzaSyAK_huw0DJnjI-ZcjxAeCffGyLdtxw_dcc',
    authDomain: 'quiz-sst.firebaseapp.com',
    databaseURL: 'https://quiz-sst-default-rtdb.firebaseio.com',
    projectId: 'quiz-sst',
    storageBucket: 'quiz-sst.firebasestorage.app',
    messagingSenderId: '606190427199',
    appId: '1:606190427199:web:7ff4dac36d2a01fc1cac8a'
};

const databaseURL = firebaseConfig.databaseURL;

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

let authBootstrapPromise = null;
let authRedirectBootstrapPromise = null;

function isPopupBlockedError(error) {
    const code = String(error?.code || '');
    return code === 'auth/popup-blocked' || code === 'auth/web-storage-unsupported' || code === 'auth/operation-not-supported-in-this-environment';
}

async function restoreGoogleAuthSession() {
    if (!authRedirectBootstrapPromise) {
        authRedirectBootstrapPromise = (async () => {
            try {
                const redirectResult = await getRedirectResult(auth);
                if (redirectResult?.user) {
                    return redirectResult.user;
                }
            } catch (error) {
                console.error('Falha ao restaurar login Google via redirect:', error);
            }

            return auth.currentUser || null;
        })();
    }

    return authRedirectBootstrapPromise;
}

async function ensureFirebaseAuth() {
    if (!authBootstrapPromise) {
        authBootstrapPromise = (async () => {
            const restoredUser = await restoreGoogleAuthSession();
            if (restoredUser) return restoredUser;
            return auth.currentUser || null;
        })();
    }

    const user = await authBootstrapPromise;
    if (!user) {
        authBootstrapPromise = null;
    }
    return user;
}

async function signInWithGoogle() {
    try {
        const credential = await signInWithPopup(auth, googleProvider);
        authBootstrapPromise = Promise.resolve(credential.user);
        return credential.user;
    } catch (error) {
        if (isPopupBlockedError(error)) {
            await signInWithRedirect(auth, googleProvider);
            return null;
        }

        throw error;
    }
}

function subscribeToGoogleAuthState(handler) {
    return onAuthStateChanged(auth, handler);
}

export {
    app,
    database,
    databaseURL,
    auth,
    ensureFirebaseAuth,
    restoreGoogleAuthSession,
    signInWithGoogle,
    subscribeToGoogleAuthState
};
