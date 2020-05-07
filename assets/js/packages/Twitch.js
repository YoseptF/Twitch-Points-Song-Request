import tmi from 'tmi.js';
import Firebase from './Firebase';
import { setDOMInterface, setDOMSongEvent, songEventButtonListener } from './DOM';

const Twitch = (() => {

  let user;

  const clientId = 'tj3x0b3h6ymne5khblzqpdk2egxigz';
  const redirectUrl = 'http://localhost:1314/user/';
  const scopes = 'user:read:email';

  const url = `https://id.twitch.tv/oauth2/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectUrl}` +
    `&response_type=token` +
    `&scope=${scopes}` +
    `&state=${Math.random().toString(36).slice(-15)}`


  const loginListener = () => {
    const logginButton = $('.loginButton')

    if (logginButton) {
      logginButton.on('click', () => {
        window.location = url
      })
    }
  }

  const chatListener = () => {
    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true
      },
      channels: [user.display_name]
    });

    client.connect();

    songEventButtonListener()

    client.on('message', (channel, tags, message, self) => {
      console.log('tags', tags)
      if (tags['custom-reward-id'] && tags['custom-reward-id'] != Firebase.songEvent && tags['badges'] && tags['badges']['broadcaster'] == '1') {
        setDOMSongEvent(tags['custom-reward-id'])
      }
      if (tags['custom-reward-id'] && tags['custom-reward-id'] == Firebase.songEvent) {
        console.log(`${tags['display-name']}: ${message}`);
        Firebase.addSong(message)
      }
    });
  }

  const currentUserListener = async () => {
    const songList = $('.songList')

    if (songList) {
      const url_token = window.location.href.match(/token=([^&]*)&/)
      if (!url_token) window.location.href = '/'
      const token = url_token[1]
      user = JSON.parse(localStorage.getItem('user'))

      const response = await fetch("https://api.twitch.tv/helix/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Client-ID': clientId
        }
      })

      const json = await response.json();

      user = json.data[0]
      localStorage.setItem('user', JSON.stringify(user))
      Firebase.initialize()
      Firebase.getSongList(user.id)

      setDOMInterface(user)
      chatListener()
    }
  }

  return { loginListener, currentUserListener }

})()

export default Twitch