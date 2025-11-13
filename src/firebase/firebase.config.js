// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgUGOKmTCUdjXcaFDH3o-g22D3u68iDj4",
  authDomain: "home-hero-ccfe7.firebaseapp.com",
  projectId: "home-hero-ccfe7",
  storageBucket: "home-hero-ccfe7.firebasestorage.app",
  messagingSenderId: "544996712439",
  appId: "1:544996712439:web:9b216674fcb245069018f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);