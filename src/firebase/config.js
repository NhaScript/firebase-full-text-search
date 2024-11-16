import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectFirestore  = getFirestore(app)

export {
    projectFirestore 
}
