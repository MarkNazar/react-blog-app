import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDq2CjRA0762ed0GTxJel4LBEJR7LzMcE4',
  authDomain: 'blog-app-f3a3b.firebaseapp.com',
  projectId: 'blog-app-f3a3b',
  storageBucket: 'blog-app-f3a3b.appspot.com',
  messagingSenderId: '99904572974',
  appId: '1:99904572974:web:3c6193aefc2a0ede2319bf',
};

//init firebase
initializeApp(firebaseConfig);

//init auth
const auth = getAuth();
//init db
const db = getFirestore();
//init storage
const storage = getStorage();

export { auth, db, storage };
