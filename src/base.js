import Rebase from "re-base";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCyAMBoNtVQIN8Cu3H3wUoFofssrU_9cvQ",
  authDomain: "foodster-d01c0.firebaseapp.com",
  databaseURL: "https://foodster-d01c0.firebaseio.com",
  projectId: "foodster-d01c0",
  storageBucket: "foodster-d01c0.appspot.com",
  messagingSenderId: "755241225397",
  appId: "1:755241225397:web:f913b7dd8ca63410de42fc",
  measurementId: "G-L5DYK1Y2KR"
};

const app = firebase.initializeApp(config);
export { app };
