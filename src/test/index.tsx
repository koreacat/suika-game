import SuikaGame from "../lib/suikaGame";
import './index.module.scss'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUreBWKQg8bvi0E9roBH5B1ZbjrJOIqiY",
  authDomain: "koreacat-50caf.firebaseapp.com",
  projectId: "koreacat-50caf",
  storageBucket: "koreacat-50caf.appspot.com",
  messagingSenderId: "687520916347",
  appId: "1:687520916347:web:234e9c907994f64c5dd3de",
  measurementId: "G-CKM9VDEMP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Test = () => <SuikaGame />
export default Test;