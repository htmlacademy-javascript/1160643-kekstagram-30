import { setUpModal } from "./modul-form.js";
import { isEscapeKey } from "./util.js";

const MAX_HASHTAGS_COUNT = 5;

const imgUpForm = document.querySelector('.img-upload__form');
const imgUpInputEl = imgUpForm.querySelector('.img-upload__input');
const hashtagsInputEl = imgUpForm.querySelector('[name="hashtags"]');
const descInputEl = imgUpForm.querySelector('[name="description"]');
const imgUpOverlayEl = document.querySelector('.img-upload__overlay');
const closeUpOverlayEl = imgUpOverlayEl.querySelector('.img-upload__cancel');
const imgUpModal = setUpModal ({
  modalEl: imgUpOverlayEl,
  closeModelEl: closeUpOverlayEl,
  onHideModal: resetForm,
});

const pristineImgUpForm = new Pristine(imgUpForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
}, false);

pristineImgUpForm.addValidator(hashtagsInputEl, validateHashtags, 'вы ввели неправильный хэш-тег', 1);
pristineImgUpForm.addValidator(hashtagsInputEl, validateHashtagsCount, 'превысили допустимое количество хэш-тегов', 2);
pristineImgUpForm.addValidator(hashtagsInputEl, validateUniqHashtegs, 'хэш-теги повторяются', 3);




imgUpForm.addEventListener('submit', (evt) => {
  const isValidForm = pristineImgUpForm.validate();

  if (!isValidForm) {
    evt.preventDefault();
  }
});

imgUpInputEl.addEventListener('change', () => {
  imgUpModal.show();
});

hashtagsInputEl.addEventListener('keydown', onKeyDownOnFormInputs);
descInputEl.addEventListener('keydown', onKeyDownOnFormInputs);

function convertToHashtagsArray(value) {
  return value.trim().split(/\s+/);
}

function validateHashtags(value) {
  const hashtags = convertToHashtagsArray(value);

  return hashtags.every((hashtag) => {
    if (hashtag === '') {
      return true;
    }

    return /^#[0-9a-zа-яё]{1,19}$/i.test(hashtag);
  });
}

function validateHashtagsCount(value) {
  const hashtags = convertToHashtagsArray(value);

  return hashtags.length <= MAX_HASHTAGS_COUNT;
}

function validateUniqHashtegs(value) {
  const hashtags = convertToHashtagsArray(value);

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    for (let j = 0; j < hashtags.length; j++) {
      if (j === i) {
        continue;
      }

      const comparedHashtag = hashtags[j];

      if (hashtag.toLowerCase() === comparedHashtag.toLowerCase()) {
        return false;
      }
    }
  }

  return true;
}

function resetForm() {
  imgUpForm.reset();
  pristineImgUpForm.reset();
}

function onKeyDownOnFormInputs(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}
