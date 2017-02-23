import Router from './modules/Route/Router';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import Scoreboard from './views/Scoreboard/Scoreboard';
import Main from './views/Main/Main';

const router = new Router();

router
  .addRoute('/SignUp', SignUp)
  .addRoute('/SignIn', SignIn)
  .addRoute('/Scoreboard', Scoreboard)
  .addRoute('/', Main)
  .start();
