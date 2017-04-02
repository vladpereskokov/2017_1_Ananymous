import Block from '../../components/Block/Block';

import template from './Game.tmpl.xml';
import './Game.scss';
import GameManager from "../../game/Managers/GameManager/GameManager";

class Game extends Block {
  constructor() {
    super();
  }

  init() {
      this._getElement().innerHTML = template();
      this.toDocument(this.render());

      new GameManager();
  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default Game;
