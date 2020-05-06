import firebase from 'firebase/app';
import 'firebase/firestore'
import { setDOMSongEvent } from './DOM'

const Firebase = (() => {
  let db;
  let fireObject;
  let songEvent;
  let songList;

  const initialize = () => {
    let firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    db = firebase.firestore();
  
    console.log('firebases: ', db);
  }

  const getSongList = (id) => {
    fireObject = db.collection("songLists").doc(id);

    fireObject.get().then(function(doc) {
      if (!doc.exists) {
          console.log("New user!");
          fireObject = db.collection("songLists");
          
          fireObject.doc(id).set({
            songEvent: '',
            songs: []
          });
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

  db.collection("songLists").doc(id)
    .onSnapshot(function(doc) {
        songList = doc.data().songs
        songEvent = doc.data().songEvent
        console.log("Current data: ", songList);
        console.log("Current data: ", songEvent);

        if(songEvent != ''){
          setDOMSongEvent(songEvent)
        }
    });

  }

  // const citiesRef = db.collection("cities");

  return { initialize, getSongList }
})()

export default Firebase