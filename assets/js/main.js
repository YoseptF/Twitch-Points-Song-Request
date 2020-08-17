import { $, $$, Bling } from './packages/bling'; // eslint-disable-line no-unused-vars
import Twitch from './packages/Twitch';
import 'firebase/firestore';
import { logOutButton } from './packages/DOM';

window.onload = () => {
  if (window.location.href === `${window.location.origin}/`) {
    Twitch.loginListener();
  }

  if (window.location.href.startsWith(`${window.location.origin}/user/`)) {
    logOutButton();
    Twitch.currentUserListener();

    $('body').style.background = 'blue';

    $$('.dropdown-toggle').forEach((toggle) => {
      toggle.on('click', (event) => {
        event.target.nextElementSibling.classList.toggle('show');
      });
    });
  }
};
