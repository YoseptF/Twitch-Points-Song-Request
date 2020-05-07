const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const Bling = (() => {
  window.on = function on(name, fn) {
    this.addEventListener(name, fn);
  };

  Node.prototype.on = window.on;

  Object.setPrototypeOf(NodeList, Array.prototype);

  NodeList.prototype.on = function on(name, fn) {
    // eslint-disable-next-line no-unused-vars
    this.forEach((elem, _i) => {
      elem.on(name, fn);
    });
  };
})();


export { $, $$, Bling };