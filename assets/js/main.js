import { $, $$, Bling } from './packages/bling'; // eslint-disable-line no-unused-vars
import Twitch from './packages/Twitch';
import 'firebase/firestore';

// if(window.location.href == window.location.origin)
// console.log('dogo');
// if (localStorage.getItem('user')) window.location = '/user/'

window.onload = () => {
  if (window.location.href === `${window.location.origin}/`) {
    Twitch.loginListener();
  }

  if (window.location.href.startsWith(`${window.location.origin}/user/`)) {
    Twitch.currentUserListener();

    $('body').style.background = 'blue';

    $$('.dropdown-toggle').forEach((toggle) => {
      toggle.on('click', (event) => {
        event.target.nextElementSibling.classList.toggle('show');
      });
    });
  }
};
