// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtMu_vRTFU9bpf3WSTuQEiQx98706r_x4",
  authDomain: "surooh-core.firebaseapp.com",
  projectId: "surooh-core",
  storageBucket: "surooh-core.firebasestorage.app",
  messagingSenderId: "374520921194",
  appId: "1:374520921194:web:ce04898989807a45ad5e13",
  measurementId: "G-BGWEJ231TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
