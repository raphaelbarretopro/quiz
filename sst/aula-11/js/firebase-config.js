import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: 'AIzaSyAjUFm2PxaVkayiYsWE9F9_EZdJ3IFy4U',
    authDomain: 'quiz-sst.firebaseapp.com',
    databaseURL: 'https://quiz-sst-default-rtdb.firebaseio.com',
    projectId: 'quiz-sst',
    storageBucket: 'quiz-sst.firebasestorage.app',
    messagingSenderId: '606190427199',
    appId: '1:606190427199:web:7ff4dac36d2a01fc1cac8a'
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

let authBootstrapPromise = null;

async function ensureFirebaseAuth() {
    if (!authBootstrapPromise) {
        authBootstrapPromise = (async () => {
            if (auth.currentUser) return auth.currentUser;

            try {
                const cred = await signInAnonymously(auth);
                return cred.user;
            } catch (error) {
                console.error('Falha ao autenticar anonimamente no Firebase:', error);
                return null;
            }
        })();
    }

    return authBootstrapPromise;
}

export { app, database, auth, ensureFirebaseAuth };
