import Block from '../../../components/Block/Block';
import viewService from '../../../services/ViewService/ViewService';

import './MainForm.scss';

export default class MainForm extends Block {
  constructor() {
    super('div', {
      class: 'wrapper__main__form'
    });

    this._urls = [];
    this._buttons = [];
    this.init();
    this._setupKeys();
  }

  _getActive(buttons) {
    for (let i in buttons) {
      if (buttons[i].children[0].classList.contains('start__background')) {
        return i;
      }
    }

    return false;
  }

  _getExistButtons() {
    return [...this._getDocument().getElementsByClassName('main__form-button')];
  }

  _activateButtons() {
    const buttons = this._getExistButtons();
    const i = this._getActive(!buttons.length ? this._getButtons() : buttons);

    this._setActive(this._buttons[i ? i : 0]);
  }

  show() {
    this._getElement().style.display = 'block';
  }

  hide() {
    this._getElement().style.display = 'none';
  }

  init() {

  }

  _setUrls(urls) {
    this._urls = urls;
  }

  _setMainButtons() {
    this._setButtons(this._getButtons());
    this._setEvents();
  }

  _setEvents() {
    this._setEventGoButtons(this._buttons);
    this._setActiveButtons(this._buttons);
  }

  _setEventGoButtons(buttons) {
    for (let button of buttons) {
      if (button.url) {
        this._setEventGoButton(button.button, () => viewService.go(button.url));
      }
    }
  }

  _setEventGoButton(button, onClickFunction) {
    button.onclick = () => {
      onClickFunction();
    };
  }

  _setActiveButtons(buttons) {
    for (let button of buttons) {
      button.button.addEventListener('mouseover', event => {
        if (event.type === 'mouseover') {
          const activeButton = this._checkActiveButton(buttons);

          if (activeButton.number !== button.number) {
            this._setPassive(activeButton);
            this._setActive(button);
          }
        }
      });
    }
  }

  _setPassive(button) {
    const background = this._getButtonField(button.button, 'div');
    const text = this._getButtonField(button.button, 'a');

    background.classList.remove('start__background');
    text.classList.remove('start__button');

    button.isActive = false;
  }

  _setActive(button) {
    const background = this._getButtonField(button.button, 'div');
    const text = this._getButtonField(button.button, 'a');

    background.classList.add('start__background');
    text.classList.add('start__button');

    button.isActive = true;
  }

  _checkActiveButton(buttons) {
    for (let button of buttons) {
      if (button.isActive) {
        return button;
      }
    }
  }

  _getButtonField(button, tag) {
    return button.querySelector(tag);
  }

  _getButtons() {
    return [...this._getElement().getElementsByClassName('main__form-button')];
  }

  _setButtons(buttons) {
    for (let buttonIndex in buttons) {
      if (!isNaN(+buttonIndex)) {
        this._buttons.push({
          number: +buttonIndex + 1,
          button: buttons[+buttonIndex],
          url: this._urls[+buttonIndex],
          isActive: false
        });
      }
    }
  }

  _setupKeys() {
    document.addEventListener('keydown', event => {
      let current = this._checkActiveButton(this._buttons);

      switch (event.keyCode) {
        case 13:
          current.button.click();
          break;
        case 38:
          this._setPassive(current);

          if (current.number === 1) {
            this._setActive(this._buttons[this._buttons.length - 1])
          } else {
            this._setActive(this._buttons[current.number - 2]);
          }
          break;
        case 40:
          this._setPassive(current);

          if (current.number < this._buttons.length) {
            this._setActive(this._buttons[current.number])
          } else {
            this._setActive(this._buttons[0]);
          }
          break;
        case 70:
          break;
        default:
          break;
      }
    });
  }
}
