import Block from '../../../components/Block/Block';
import Popup from '../../../animations/Popup/Popup';
import Fade from '../../../animations/Fade/Fade';

export default class FormView extends Block {
  constructor(form) {
    super('div', {
      class: 'registration'
    });

    this._form = form;
  }

  init() {
    this._background = this._createBackground();
    this._form.renderTo(this._getElement());
    this._initAnimation();
    this.globalFind('.main-wrapper').appendChild(this._background.render());
    this.globalFind('.main-wrapper').appendChild(this.render());
  }

  show() {
    this._animationBackground.on();
    this._animationForm.on();

    this._getElement().style.display = 'block';
    this._background._getElement().style.display = 'block';
  }

  hide() {
    this._animationBackground.off();
    this._animationForm.off();

    setTimeout(() => {
      this._getElement().style.display = 'none';
      this._background._getElement().style.display = 'none';
    }, 400);
  }

  insertAfter(insertElement, referenceElement) {
    const parent = referenceElement.parentNode;
    const next = referenceElement.nextSibling;
    return next ? parent.insertBefore(insertElement, next) :
      parent.appendChild(insertElement);
  }

  getForm() {
    return this._getElement();
  }

  _initAnimation() {
    this._animationForm = new Popup(this);
    this._animationBackground = new Fade(this._background);
  }

  _createBackground() {
    return new Block('div', {
      class: 'registration__back'
    })
  }
}