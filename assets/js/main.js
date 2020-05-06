import './packages/bling';
import Twitch from './packages/Twitch'
import 'firebase/firestore'

if (localStorage.getItem('twitch_token')) window.location = './user/'

window.onload = () => {
  Twitch.loginListener()

  Twitch.currentUserListener()

  $('body').style.background = 'blue';

  $$('.dropdown-toggle').forEach(toggle => {
    toggle.on('click', (event) => {
      event.target.nextElementSibling.classList.toggle('show')
    })
  });

}
