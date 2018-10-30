import firebase from 'firebase/app';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyCMf6nKzEVxa1QOsmx7edThfGqVIvmayq8",
  authDomain: "my-project-1539982235609.firebaseapp.com",
  databaseURL: "https://my-project-1539982235609.firebaseio.com",
  projectId: "my-project-1539982235609",
  storageBucket: "my-project-1539982235609.appspot.com",
  messagingSenderId: "921561837108"
});

//here lies the configuration for the firebase storage dump this application
//uses.

export default firebase;