/**
 * Класс представляет собой view
 */
export default class View {
  /**
   * Создаёт новую view
   * @param {Object} [options={}] - Объект с параметрами
   */
  constructor(options = {}) {
    this.tagName = options.tagName || 'div';
    this._el = document.createElement(this.tagName);
  }

  /**
   * Инициализация параметров view (выполняется сразу после создания)
   * Необходимо перепределять
   * @param {Object} [options={}] - Объект с параметрами
   */
  init(options = {}) {
    this.setAttrs(options.attrs);
  }

  /**
   * Вызывается при приостановке работы view (при скрытии view или переходе на другую view)
   * Необходимо переопределять своей логикой
   */
  pause() {
    this.hide();
  }

  /**
   * Вызывается при начале или продолжении работы view (после того, как view была скрыта)
   * Необходимо переопределять своей логикой
   */
  resume() {
    this.show();
  }

  /**
   * Показывает view
   */
  show() {
    this._el.style.display = "block";
  }

  /**
   * Скрывает view
   */
  hide() {
    this._el.style.display = "none";
  }

  /**
   * Вставляет текущую view в переданный элемент
   * @param {HTMLElement} el - HTML-элемент, к которому добавляется элемент текущей view
   */
  appendTo(el) {
    el.appendChild(this._el);
  }

  /**
   * Удаляет элемент текущей view
   */
  remove() {
    this._el && this._el.remove();
  }

  /**
   * Заменяет элемент текущей view
   * @param {HTMLElement} el - HTML-элемент, который становится элементом текущей view
   */
  setElement(el) {
    this._el && this._el.remove();
    this._el = el;
  }

  /**
   * Устанавливает текущей view набор атрибутов
   * @param {Object} [attrs={}] - Объект с атрибутами, которые будут установлены у текущего элемента view
   */
  setAttrs(attrs = {}) {
    Object.keys(attrs).forEach(name => {
      this._el.setAttribute(name, attrs[name]);
    })
  }

  /**
   * Устанавливает текущей view роутер
   * @param {Router} router - инстанс роутера
   */
  setRouter(router) {
    this._router = router;
  }

  getRouter() {
    return this._router;
  }

  /**
   * Возвращает строку, содержашую текстовое представление текущей view
   * @returns {string}
   */
  toString() {
    return this._el.outerHTML;
  }
}
