// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC2mZz3yU7VnqwWTBHS0wN-ICb6vYqZ5jk",
  authDomain: "ratetheclub.firebaseapp.com",
  projectId: "ratetheclub",
  storageBucket: "ratetheclub.appspot.com",
  messagingSenderId: "532159764220",
  appId: "1:532159764220:web:a50f50d064f5b92feca979",
  measurementId: "G-SMQP2FF64V"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
const functions = getFunctions(app);

export { app, auth, db, storage, provider, functions };
