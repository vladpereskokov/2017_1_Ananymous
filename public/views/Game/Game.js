import Block from '../../components/Block/Block';
import GameScene from './core/GameScene';

import template from './Game.tmpl.xml';
import './Game.scss';

class Game extends Block {
  constructor() {
    super();
  }

  init() {
      this._getElement().innerHTML = template();
      this.toDocument(this.render());
      const gameScene = new GameScene();
      gameScene.render();

  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default Game;
