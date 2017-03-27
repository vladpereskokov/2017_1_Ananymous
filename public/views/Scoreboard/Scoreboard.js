import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';

const table = {
  head: ['Nickname', 'Score'],
  body: [
    ['Marvin', '150'],
    ['Trash', '500'],
    ['Top', '10'],
    ['Winner', '1000']
  ].sort((lhs, rhs) => {
    return rhs[1] - lhs[1];
  })
};

class Scoreboard extends Table {
  constructor() {
    super(table);
  }

  init() {
    this._getElement().append(this._backButton().render());
    this.globalFind('.wrapper').appendChild(this._getElement());
    this._sortTable();
  }

  showMain() {
    this.getRouter().go('/');
  }

  _sortTable() {
    const table = this.find('.scoreboard');

    table.onclick = event => {
      if (event.target.tagName !== 'TH') {
        return;
      }

      this._sort(table, event.target.cellIndex, event.target.getAttribute('data-type'));
    };
  }

  _sort(table, column, type) {
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = [].slice.call(tbody.rows);

    rows.sort(this._getCompare(type, column));

    this._changeBody(table, rows, tbody);
  }

  _changeBody(table, rows, tbody) {
    table.removeChild(tbody);

    for (let i of rows) {
      tbody.appendChild(i);
    }

    table.appendChild(tbody);
  }

  _getCompare(type, column) {
    switch (type) {
      case 'Score':
        return (lhs, rhs) => {
          return rhs.cells[column].innerHTML - lhs.cells[column].innerHTML;
        };
      case 'Nickname':
        return (lhs, rhs) => {
          return lhs.cells[column].innerHTML > rhs.cells[column].innerHTML ? 1 : -1;
        };
      default:
        return null;
    }
  }

  _backButton() {
    const back = new Button({
      text: 'Back'
    });

    back.setAttributeBlock('class', 'button__table');

    back.start('click', this.showMain.bind(this));

    return back;
  }
}

export default Scoreboard;
