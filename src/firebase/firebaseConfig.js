import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import "firebase/functions";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBs6w6hg-hGthQ0B55dzQ0-mja_6xqd5xY",
  authDomain: "chat-app-d3483.firebaseapp.com",
  projectId: "chat-app-d3483",
  storageBucket: "chat-app-d3483.appspot.com",
  messagingSenderId: "512064360970",
  appId: "1:512064360970:web:5216eca5bbf16b4b2fc5f3",
};

const app = initializeApp(firebaseConfig)

export default app;
export const firestore = getFirestore(app);

