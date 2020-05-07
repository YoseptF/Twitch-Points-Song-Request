import firebase from 'firebase/app';
import 'firebase/firestore';
import { hideDOMSongEvent, setDOMSongsTable } from './DOM';

const Firebase = (() => {
  let db;
  let fireObject;
  let songEvent;
  let songs;
  let songid;

  const initialize = () => {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    db = firebase.firestore();
  };

  const getSongList = (id) => {
    songid = id;
    fireObject = db.collection('songLists').doc(id);

    fireObject.get().then((doc) => {
      if (!doc.exists) {
        fireObject = db.collection('songLists');

        fireObject.doc(id).set({
          songEvent: '',
          songs: [],
        });
      }
    }).catch(() => {
      // console.log("Error getting document:", error);
    });

    db.collection('songLists').doc(id)
      .onSnapshot((doc) => {
        ({ songs } = doc.data());
        ({ songEvent } = doc.data());


        if (songs.length > 0) {
          setDOMSongsTable(songs);
        }

        if (songEvent !== '') {
          hideDOMSongEvent();
        }
      });
  };

  const addSong = (song) => {
    const check = song.match(/watch\?v=([^&]*)|\.be\/([^&]*)/);
    if (check) {
      if (check[1]) {
        song = check[1];
      }
      if (check[2]) {
        song = check[2];
      }
    }

    fireObject = fireObject || db.collection('songLists').doc(songid);

    fireObject.update({
      songs: firebase.firestore.FieldValue.arrayUnion(song),
    });
  };

  const removeSong = (song) => {
    fireObject = fireObject || db.collection('songLists').doc(songid);

    fireObject.update({
      songs: firebase.firestore.FieldValue.arrayRemove(song),
    });
  };

  return {
    initialize,
    getSongList,
    addSong,
    removeSong,
    get songEvent() { return songEvent; },
    set songEvent(event) {
      songEvent = event;

      fireObject = db.collection('songLists');
      fireObject.doc(songid).update({
        songEvent: event,
      });
    },
    get songList() { return songs; },
  };
})();

export default Firebase;
