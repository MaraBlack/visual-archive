// src/app/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyARiyciwBq48wf1OqJPfCJD7MdCXqDGQ2I",
  authDomain: "visual-archive-admin-c5561.firebaseapp.com",
  projectId: "visual-archive-admin-c5561",
  storageBucket: "visual-archive-admin-c5561.firebasestorage.app",
  messagingSenderId: "838258519124",
  appId: "1:838258519124:web:32fcd3f77f650447ba11c1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);