import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/functions";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MASSEAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, firestore };
export default app;
