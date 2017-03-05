import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import View from '../../modules/View/View';

const table = new Table({
  head: ['Nickname', 'Score'],
  body: [
    ['Marvin', '150'],
    ['Trash', '500'],
    ['Top', '10'],
    ['Winner', '1000']
  ]
});

class Scoreboard extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    table.renderTo(this._el);
    document.body.appendChild(this._el);
    document.body.querySelector('.scoreboard').appendChild(this._backButton().render());
  }

  _backButton() {
    const back = new Button({
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
