import './packages/bling';
import Twitch from './packages/loginTwitch'
import firebase from 'firebase/app';
import 'firebase/firestore'

window.onload = () => {

  Twitch.login()

  $('body').style.background = 'blue';

  // $('#sidebarCollapse').on('click', function () {
  //   $('#sidebar').classList.toggle('active');
  // });

  $$('.dropdown-toggle').forEach(toggle => {
    toggle.on('click', (event) => {
      event.target.nextElementSibling.classList.toggle('show')      
    })
  });

  // console.log('pro: ', process);

  let firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  console.log('firebase: ', firebaseConfig);
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

  var citiesRef = db.collection("cities");

}
