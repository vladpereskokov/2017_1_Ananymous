import Block from '../../components/Block/Block';
import Scene from '../../game/Scene/Scene';

import template from './Game.tmpl.xml';
import './Game.scss';

class Game extends Block {
  constructor() {
    super();
  }

  init() {
      this._getElement().innerHTML = template();
      this.toDocument(this.render());
      new Scene();
  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default Game;
