import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbw-dslryDsF-3ocqfqpzRU_LppT23NWU",
  authDomain: "aasf-c8e7f.firebaseapp.com",
  projectId: "aasf-c8e7f",
  storageBucket: "aasf-c8e7f.appspot.com",
  messagingSenderId: "1046519010177",
  appId: "1:1046519010177:web:a689fdb574c1b9469ace80"
};


const app = initializeApp(firebaseConfig);
const storage=getStorage(app);
const db=getFirestore(app)
const auth=getAuth(app);

export {db, storage, auth};