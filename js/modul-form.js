import { isEscapeKey } from "./util.js";

const TOGGLE_MODAL_CLASS = 'hidden';
const SHOW_MODAL_CLASS = 'modal-open';

function setUpModal ({modalEl, closeModelEl, onHideModalCd}) {
  closeModelEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    hide();
  });

  function onDocumentKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hide();
    }
  }

  function show() {
    modalEl.classList.remove(TOGGLE_MODAL_CLASS);
    document.body.classList.add(SHOW_MODAL_CLASS);

    document.addEventListener('keydown', onDocumentKeyDown);
  }

  function hide() {
    modalEl.classList.add(TOGGLE_MODAL_CLASS);
    document.body.classList.remove(SHOW_MODAL_CLASS);

    if (typeof onHideModalCd === 'function') {
      onHideModalCd();
    }

    document.removeEventListener('keydown', onDocumentKeyDown);
  }

  return {
    show,
    hide,
  };
}

export {setUpModal};
