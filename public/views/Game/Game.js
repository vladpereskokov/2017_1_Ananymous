import Block from '../../components/Block/Block';
import Button from '../../components/Button/Button';
import View from '../../modules/View/View';

import './Game.scss';

class Game extends View {
  constructor() {
    super();
  }

  init(options = {}) {

    const block = new Block('div', {
      class: 'is_overlay',
      id: 'trailer'
    });

    block._getElement().innerHTML = "<video id=\"video\" width=\"100%\" height=\"auto\" autoplay=\"autoplay\" " +
      "loop=\"loop\" preload=\"auto\"><source src=\"/views/Game/background.mp4\"></source></video>";
    document.body.appendChild(block.render());
  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default Game;
