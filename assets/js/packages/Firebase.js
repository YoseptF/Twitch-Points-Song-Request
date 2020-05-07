import firebase from 'firebase/app';
import 'firebase/firestore'
import { hideDOMSongEvent, setDOMCurrentSong, setDOMSongsTable } from './DOM'

const Firebase = (() => {
  let db;
  let fireObject;
  let songEvent;
  let songList;
  let songid;

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

  }

  const getSongList = (id) => {
    songid = id
    fireObject = db.collection("songLists").doc(id);

    fireObject.get().then(function (doc) {
      if (!doc.exists) {
        fireObject = db.collection("songLists");

        fireObject.doc(id).set({
          songEvent: '',
          songs: []
        });
      }
    }).catch(function (error) {
      // console.log("Error getting document:", error);
    });

    db.collection("songLists").doc(id)
      .onSnapshot(function (doc) {
        songList = doc.data().songs
        songEvent = doc.data().songEvent

        if (songList.length > 0) {
          setDOMSongsTable(songList)
        }

        console.log("Current songList: ", songList);
        console.log("Current songEvent: ", songEvent);

        if (songEvent != '') {
          hideDOMSongEvent()
        }
      });

  }

  const addSong = (song) => {

    let check = song.match(/watch\?v=([^&]*)|\.be\/([^&]*)/)
    if (check) {
      if (check[1]){
        console.log(check[1])
        song = check[1]
      };
      if (check[2]){
        console.log(check[2])
        song = check[2]
      };
    }
    
    fireObject = fireObject || db.collection("songLists").doc(songid);

    fireObject.update({
      songs: firebase.firestore.FieldValue.arrayUnion(song)
    });
  }

  const removeSong = (song) => {
    fireObject = fireObject || db.collection("songLists").doc(songid);

    fireObject.update({
      songs: firebase.firestore.FieldValue.arrayRemove(song)
    });
  }

  return {
    initialize,
    getSongList,
    addSong,
    removeSong,
    get songEvent() { return songEvent },
    set songEvent(event) {
      songEvent = event;

      fireObject = db.collection("songLists");
      fireObject.doc(songid).update({
        songEvent: event
      });
    },
    get songList() { return songList }
  }
})()

export default Firebase