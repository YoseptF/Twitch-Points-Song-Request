import tmi from 'tmi.js'; // eslint-disable-line import/extensions
import Firebase from './Firebase';
import {
  setDOMInterface, setDOMSongEvent, songEventButtonListener, setDOMAddSongButton,
} from './DOM';
import { $, Bling } from './bling'; // eslint-disable-line no-unused-vars

const Twitch = (() => {
  let user;

  const clientId = process.env.TWITCH_CLIENT_ID;
  const redirectUrl = process.env.TWITCH_REDIRECT_URL;
  const scopes = process.env.TWITCH_SCOPES;

  const url = 'https://id.twitch.tv/oauth2/authorize'
    + `?client_id=${clientId}`
    + `&redirect_uri=${redirectUrl}`
    + '&response_type=token'
    + `&scope=${scopes}`
    + `&state=${Math.random().toString(36).slice(-15)}`;


  const loginListener = () => {
    const logginButton = $('.loginButton');

    if (logginButton) {
      logginButton.on('click', () => {
        window.location = url;
      });
    }
  };

  const chatListener = () => {
    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true,
      },
      channels: [user.display_name],
    });

    client.connect();

    songEventButtonListener();

    // eslint-disable-next-line no-unused-vars
    client.on('message', (_channel, tags, message, _self) => {
      if (tags['custom-reward-id'] && tags['custom-reward-id'] !== Firebase.songEvent && tags.badges && tags.badges.broadcaster === '1') {
        setDOMSongEvent(tags['custom-reward-id']);
      }
      if (tags['custom-reward-id'] && tags['custom-reward-id'] === Firebase.songEvent) {
        Firebase.addSong(message);
      }
    });
  };

  const currentUserListener = async () => {
    const songList = $('.songList');

    setDOMAddSongButton();

    if (songList) {
      const urlToken = window.location.href.match(/token=([^&]*)&/);
      if (!urlToken) window.location.href = '/';
      const token = urlToken[1];
      user = JSON.parse(localStorage.getItem('user'));

      const response = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Client-ID': clientId,
        },
      });

      const json = await response.json();

      user = json.data[0];
      localStorage.setItem('user', JSON.stringify(user));
      Firebase.initialize();
      Firebase.getSongList(user.id);

      setDOMInterface(user);
      chatListener();
    }
  };

  return { loginListener, currentUserListener };
})();

export default Twitch;
