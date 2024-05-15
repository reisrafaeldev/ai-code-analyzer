import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDbrJaWQUtT-YGSP0LoRWZRgyxJCpeLAWM",
  authDomain: "gen-code-master.firebaseapp.com",
  projectId: "gen-code-master",
  storageBucket: "gen-code-master.appspot.com",
  messagingSenderId: "419403884604",
  appId: "1:419403884604:web:8ba0b5957e98cf57867b39",
  measurementId: "G-W3352W61CE",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
