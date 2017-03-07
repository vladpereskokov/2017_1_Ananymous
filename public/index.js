import Router from './modules/Route/Router';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import Scoreboard from './views/Scoreboard/Scoreboard';
import Game from './views/Game/Game';
import Main from './views/Main/Main';

import './css/reset.scss';

const router = new Router();

const eventListener = (event => {
  const el = event.target;
  if ((el.tagName === 'A' || el.tagName === 'BUTTON') && (el.getAttribute('data-nav') || el.getAttribute('href'))) {
    const url = el.getAttribute('data-nav') || el.getAttribute('href');
    if (el.target !== '_blank' && el.target !== '_self') {
      event.preventDefault();
      new Router().go(url);
    }
  }
});

window.addEventListener('click', eventListener);

router
  .addRoute('/Game', Game)
  .addRoute('/SignUp', SignUp)
  .addRoute('/SignIn', SignIn)
  .addRoute('/Scoreboard', Scoreboard)
  .addRoute('/', Main)
  .start();
