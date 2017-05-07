import Block from '../../components/Block/Block';

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
