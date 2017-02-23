import Block from '../../components/Block/Block';
import Table from '../../components/Table/Table';
import View from '../../modules/View/View';

import './Scoreboard.css';

const scoreboard = new Block('div', {
  class: 'form z-depth-2 table-responsive'
});

const table = new Table({
  class: 'table table-striped'
}, {
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
    const back = new Block('button', {
      class: 'back-button btn btn-lg btn-primary btn-block',
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
