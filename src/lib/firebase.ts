import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, Auth } from 'firebase/auth';
import { initializeFirestore, getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Updated Firebase configuration credentials
const firebaseConfig = {
  apiKey: "AIzaSyD3y1r9t8HOrK263O1TaN1q0SscMr29NIQ",
  authDomain: "zees-group-global.firebaseapp.com",
  projectId: "zees-group-global",
  storageBucket: "zees-group-global.firebasestorage.app",
  messagingSenderId: "1096387205036",
  appId: "1:1096387205036:web:0d0c307321fb9a592e0c09",
  measurementId: "G-GQ8RGTSF4T"
};

// Initialize or retrieve singleton App instance
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Robust Firestore Initialization with Long-Polling Fallback
let dbInstance: Firestore;
try {
  dbInstance = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  });
} catch {
  dbInstance = getFirestore(app);
}

// Initialize Analytics conditionally (safely works in browser context)
let analyticsInstance: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analyticsInstance = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn('Firebase Analytics not supported in current environment:', err);
  });
}

export const db: Firestore = dbInstance;
export const auth: Auth = getAuth(app);
export const analytics = analyticsInstance;

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { signInWithPopup, signOut };
export default app;
