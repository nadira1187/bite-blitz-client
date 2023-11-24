// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6vmapXX9Eamf7-EaIyXivqeaHf0rn8Ik",
  authDomain: "byte-blitz-client.firebaseapp.com",
  projectId: "byte-blitz-client",
  storageBucket: "byte-blitz-client.appspot.com",
  messagingSenderId: "244414380407",
  appId: "1:244414380407:web:4b4760c1c9b2fc65e9c972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;