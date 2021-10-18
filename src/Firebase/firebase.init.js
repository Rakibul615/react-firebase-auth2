import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const firebaseAuthInitialization=()=>{
    initializeApp(firebaseConfig);
}
export default firebaseAuthInitialization;