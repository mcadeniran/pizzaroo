// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from '@firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8lgLlD85E_MhXbyp_tBXF_ZY4Hmhjl_I',
  authDomain: 'pizzarro-storage.firebaseapp.com',
  projectId: 'pizzarro-storage',
  storageBucket: 'pizzarro-storage.appspot.com',
  messagingSenderId: '711690075303',
  appId: '1:711690075303:web:f2dececfa2e44844a42f82',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseStorage = getStorage(app);
