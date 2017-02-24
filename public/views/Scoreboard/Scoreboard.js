import Button from '../../components/Button/Button';
import Block from '../../components/Block/Block';
import Table from '../../components/Table/Table';
import View from '../../modules/View/View';

import './Scoreboard.scss';

const scoreboard = new Block('div', {
  class: 'z-depth-2 scoreboard'
});

const table = new Table({
  head : ['Nickname', 'Score'],
  body: [
    ['Marvin', '150'],
    ['Trash', '500'],
    ['Top', '10'],
    ['Winner', '1000']
  ]
});

scoreboard.append(table.render());

class Scoreboard extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    this._changeForm();
    scoreboard.renderTo(this._el);
    document.body.appendChild(this._el);
  }

  _changeForm() {
    table.append(this._backButton().render());
  }

  _backButton() {
    const back = new Button({
      class: 'back-button',
      text: 'Back'
    });

    back.start('click', this.showMain.bind(this));

    return back;
  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default Scoreboard;
