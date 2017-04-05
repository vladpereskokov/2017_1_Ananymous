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

  hide() {
    this._getDocument().querySelector('#blocker').parentNode.style.display = 'none';
    this._getDocument().querySelector('canvas').style.display = 'none';
  }

  show() {
    this._getDocument().querySelector('#blocker').parentNode.style.display = 'block';
    this._getDocument().querySelector('canvas').style.display = 'block';
  }
}

export default Game;
