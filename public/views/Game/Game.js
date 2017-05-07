import Block from '../../components/Block/Block';

import FullScreen from "../../modules/FullScreen/FullScreen";
import Start from "../../game/Start";

import './Game.scss';
import GameManager from "../../game/Managers/GameManager/GameManager";

class Game extends Block {
  constructor() {
    super();
  }

  init() {
    new GameManager().startGame();
  }

  showMain() {
    this.getRouter().go('/');
  }

  hide() {
  }

  show() {
  }
}

export default Game;
