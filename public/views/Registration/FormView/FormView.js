import Block from "../../../components/Block/Block";

export default class FormView extends Block {
  constructor(form) {
    super('div', {
      class: 'registration'
    });

    this._form = form;
  }

  init() {
    this._form.renderTo(this._getElement());
    this.globalFind('.main-wrapper').appendChild(this._getElement());
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
}