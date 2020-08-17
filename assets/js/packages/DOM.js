import { $, $$, Bling } from './bling'; // eslint-disable-line no-unused-vars

/* eslint-disable no-await-in-loop */
import Firebase from './Firebase';
import 'regenerator-runtime';

const setDOMInterface = (user) => {
  $('.userImg').src = user.profile_image_url;
  $('.userDisplayName').innerHTML = user.display_name;
  $('.userGreeting').innerHTML = `Hello, ${user.display_name}!`;
};

const hideDOMSongEvent = () => {
  $('.songEventSetter').style.display = 'none';
};

const setDOMSongEvent = (event) => {
  $('#reward-id').value = event;
};

const songEventButtonListener = () => {
  $('.setEventButton').on('click', () => {
    Firebase.songEvent = $('#reward-id').value;
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  });
};

const DOMToggleEmptySongs = () => {
  const emptyDataSong = $('#player');
  emptyDataSong.dataset.empty = emptyDataSong.dataset.empty === 'true' ? 'false' : 'true';
};

const setIframeListener = () => {
  const tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let player;

  function onPlayerStateChange(event) {
    if (event.data === 0) {
      const now = Firebase.songList[0];
      const next = Firebase.songList[1];

      if (next) {
        player.loadVideoById(next);
      } else {
        DOMToggleEmptySongs();
      }
      Firebase.removeSong(now);
    }
  }
  function onPlayerReady() {
    // console.log('ready');
  }

  window.onYouTubeIframeAPIReady = function on() {
    player = new YT.Player('player', { // eslint-disable-line no-undef
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };
};

const setDOMCurrentSong = (song) => {
  const player = $('.player');

  player.src = `https://www.youtube.com/embed/${song}?enablejsapi=1`;
  DOMToggleEmptySongs();
  setIframeListener();
};

const setDOMSongsTable = async (songList) => {
  if ($('.player').dataset.empty === 'true') setDOMCurrentSong(songList[0]);

  const pendingSongs = $('.pendingSongs');

  pendingSongs.innerHTML = '';

  for (let i = 1; i < songList.length; i += 1) {
    const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${songList[i]}`);
    const json = await response.json();

    pendingSongs.innerHTML += `
    <tr>
    <th scope="row">${i}</th>
    <td>${json.title}</td>
    <td><a href="${json.url}" target='_blank'>${json.url}</a></td>
    <td><button class="btn btn-block btn-danger deleteSongButton" data-id="${songList[i]}">Delete</button></td>
    </tr>
    `;
  }

  $$('.deleteSongButton').forEach((button) => {
    button.on('click', () => {
      Firebase.removeSong(button.dataset.id);
    });
  });
};

const setDOMAddSongButton = () => {
  $('.addNewSongButton').on('click', (event) => {
    event.preventDefault();
    if (event.target.previousElementSibling.value !== '') Firebase.addSong(event.target.previousElementSibling.value);
  });
};

const logOutButton = () => {
  $('.logoutBtn').on('click', () => {
    localStorage.clear();
    window.location.href = window.location.origin;
  });
};

export {
  setDOMInterface,
  hideDOMSongEvent,
  setDOMSongEvent,
  songEventButtonListener,
  setDOMCurrentSong,
  setDOMSongsTable,
  setDOMAddSongButton,
  logOutButton,
};
