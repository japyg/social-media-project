// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYt0G7L3kCqE7kbg5fc1j4zORiI91oA1A",
  authDomain: "social-media-project-abc3a.firebaseapp.com",
  projectId: "social-media-project-abc3a",
  storageBucket: "social-media-project-abc3a.appspot.com",
  messagingSenderId: "778413948628",
  appId: "1:778413948628:web:b949a487cf560f05284541",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
