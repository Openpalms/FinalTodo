import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA9c8mcvoH8xvvYNdqriEkT6VvdO8znttg',
  authDomain: 'dndreact-ca0d7.firebaseapp.com',
  databaseURL:
    'https://dndreact-ca0d7-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'dndreact-ca0d7',
  storageBucket: 'dndreact-ca0d7.appspot.com',
  messagingSenderId: '632887957023',
  appId: '1:632887957023:web:afbacd8fc1d04cef21272a',
};

const app = initializeApp(firebaseConfig);
export const bd = getDatabase(app);
export const storage = getStorage(app);
