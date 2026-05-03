import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Sin variables VITE_FIREBASE_* (p. ej. GitHub Pages demo), initializeApp() puede lanzar y dejar la app en blanco.
const hasFirebase =
  typeof import.meta.env.VITE_FIREBASE_API_KEY === "string" &&
  import.meta.env.VITE_FIREBASE_API_KEY.length > 0;

export const firebaseAuth: Auth = hasFirebase
  ? getAuth(initializeApp(firebaseConfig))
  : (null as unknown as Auth);
