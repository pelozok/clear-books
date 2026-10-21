import { initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Credenciales en .env.local (ver .env.example). Proyecto: clear-books-56595.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

// App Check: solo esta app (no scripts sueltos con la API key) puede hablar con Firebase.
// Se activa si hay site key de reCAPTCHA v3; con emuladores no aplica.
const useEmulator = import.meta.env.DEV && import.meta.env.VITE_USE_EMULATOR === "1";
if (import.meta.env.VITE_RECAPTCHA_SITE_KEY && !useEmulator) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}

// Caché offline persistente (IndexedDB) compartida entre pestañas: la app
// abre y escribe sin conexión y sincroniza al volver.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export const auth = getAuth(app);

// Solo desarrollo: VITE_USE_EMULATOR=1 conecta Auth y Firestore a los emuladores
// locales (npx firebase-tools emulators:start). Nunca afecta producción.
if (useEmulator) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", Number(import.meta.env.VITE_EMULATOR_FIRESTORE_PORT) || 8080);
}
