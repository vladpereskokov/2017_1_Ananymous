import Block from "../../../components/Block/Block";
import viewService from "../../../modules/Routing/Router";

export default class FormView extends Block {
  constructor(form) {
    super('div', {
      class: 'registration'
    });

    this._form = form;
  }

  init() {
    this._form.renderTo(this._getElement());

    this.globalFind('.wrapper').appendChild(this._getElement());
  }

  getForm() {
    return this._getElement();
  }
}