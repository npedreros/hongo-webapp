import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCFvTE96Did9USBxP6sszgQIE_f73W94hI",
  authDomain: "hongoapp.firebaseapp.com",
  databaseURL: "https://hongoapp-default-rtdb.firebaseio.com",
  projectId: "hongoapp",
  storageBucket: "hongoapp.appspot.com",
  messagingSenderId: "48567051935",
  appId: "1:48567051935:web:a887478e81d4814669e4aa",
  measurementId: "G-YLS3YFSVYL"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;