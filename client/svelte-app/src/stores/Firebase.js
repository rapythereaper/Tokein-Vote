import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth"
import { getFirestore,doc, collection} from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
    apiKey: "AIzaSyD6zXE1wJBeEyRzl5lB0GoyT_53H_oLgfo",
    authDomain: "token-based-voting-syste-8d5b3.firebaseapp.com",
    projectId: "token-based-voting-syste-8d5b3",
    storageBucket: "token-based-voting-syste-8d5b3.appspot.com",
    messagingSenderId: "545106967277",
    appId: "1:545106967277:web:087f5050607b25a73e2ae4"
  };  


const app = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth();
export const FIREBASE_FUNCTION=getFunctions();
export const FIREBASE_FIRESTORE=getFirestore();
export const FIREBASE_STORAGE=getStorage();




import {connectAuthEmulator } from "firebase/auth";
import { connectFunctionsEmulator } from 'firebase/functions';
import {connectFirestoreEmulator} from "firebase/firestore"
import {connectStorageEmulator} from "firebase/storage";


/*Added the console message inside if to verify that indeed the controoll flow went inside the if  blocks*/
if(process.env.NODE_ENV=="development"){
  console.log(`[*] Running in ${process.env.NODE_ENV} mode.`);

  connectAuthEmulator(FIREBASE_AUTH, "http://localhost:9099");
  connectFunctionsEmulator(FIREBASE_FUNCTION,"localhost",5001);
  connectFirestoreEmulator(FIREBASE_FIRESTORE,"localhost",8080);
  connectStorageEmulator(FIREBASE_STORAGE,"localhost",9199);
}else{
  console.log(`[*] Running in ${process.env.NODE_ENV} mode.`);

}

export const generateRandomToken=()=>{
  const collec=collection(FIREBASE_FIRESTORE,"name")
  return doc(collec).id
}