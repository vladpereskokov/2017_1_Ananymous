import Block from '../../components/Block/Block';
import Button from '../../components/Button/Button';
import View from '../../modules/View/View';

import './main_background.png';

class Game extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    const img = new Block('img', {
      src: '/views/Game/main_background.png'
    });

    const button = new Button({
      text: 'Back'
    });
    button.start('click', this.showMain.bind(this));

    document.body.appendChild(img.render());
    document.body.appendChild(button.render());
  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default Game;
