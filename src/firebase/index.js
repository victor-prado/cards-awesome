// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LocalStorage } from "quasar";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALdN47_OlxgGLJDdfHPRGa97jc92DUkc4",
  authDomain: "cards-awesome.firebaseapp.com",
  projectId: "cards-awesome",
  storageBucket: "cards-awesome.appspot.com",
  messagingSenderId: "221628680215",
  appId: "1:221628680215:web:f7d51d153f71e9fd98f452",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    LocalStorage.set("user", user);
  } else {
    LocalStorage.remove("user");
  }
});
