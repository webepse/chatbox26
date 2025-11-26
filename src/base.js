import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// ne pas oublier d'adpater à votre firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvPXxpwyxWxkvbgUEDXOhNghs0gN3N5ig",
    authDomain: "chatbox26-9aafc.firebaseapp.com",
    databaseURL: "https://chatbox26-9aafc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatbox26-9aafc",
    storageBucket: "chatbox26-9aafc.firebasestorage.app",
    messagingSenderId: "328319591018",
    appId: "1:328319591018:web:1b92a1b9a73bf15cfde013"
}

const firebaseApp = initializeApp(firebaseConfig)
const database = getDatabase(firebaseApp)

export default database