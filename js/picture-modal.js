import {getPhotoById } from "./picture-previews.js";
import { setUpModal } from "./modul-form.js";

const RECEIVED_COMMENTS_INCREASE_COUNT = 5;

const pictureModalEl = document.querySelector('.big-picture');
const imageEl = pictureModalEl.querySelector('.big-picture__img');
const likesEl = pictureModalEl.querySelector('.likes-count');
const commentCountEl = pictureModalEl.querySelector('.social__comment-count');
const shownCommentCountEl = commentCountEl.querySelector('.social__comment-shown-count');
const totalCommentCountEl = commentCountEl.querySelector('.social__comment-total-count');
const commentsContainerEl = pictureModalEl.querySelector('.social__comments');
const loadCommentsBut = pictureModalEl.querySelector('.comments-loader');
const socialCaptionEl = pictureModalEl.querySelector('.social__caption');
const closePictureModalEl = pictureModalEl.querySelector('.big-picture__cancel');

const bigPictureModal = setUpModal({
  modalEl:pictureModalEl,
  closeModelEl: closePictureModalEl,
});

let receivedCommentsCount = 0;
let showCommentsCount = 0;
let allComments = [];

const updateShownCommentCountText = () => {
  shownCommentCountEl.textContent = showCommentsCount;
};

const isShownAllComments = () => showCommentsCount === allComments.length;


const createCommentEl = ({avatar, name, message}) => {
  const commentEl = document.createElement('li');
  commentEl.classList.add('social__comment');

  const avatarEl = document.createElement('img');
  avatarEl.classList.add('social__picture');
  avatarEl.src = avatar;
  avatarEl.alt = name;
  avatarEl.width = 35;
  avatarEl.height = 35;

  const textEl = document.createElement('p');
  textEl.classList.add('social__text');
  textEl.textContent = message;

  commentEl.append(avatarEl, textEl);

  return commentEl;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  commentsContainerEl.innerHTML = '';

  for (showCommentsCount = 0; showCommentsCount < allComments.length; showCommentsCount++) {
    if (showCommentsCount >= receivedCommentsCount + RECEIVED_COMMENTS_INCREASE_COUNT) {
      break;
    }

    commentsFragment.append(createCommentElement(allComments[showCommentsCount]));
  }

  receivedCommentsCount = receivedCommentsCount + RECEIVED_COMMENTS_INCREASE_COUNT;

  return commentsFragment;
};

const renderPicture = ({url, likes, comments, description}) => {
  allComments = comments;
  showCommentsCount = 0;
  receivedCommentsCount = 0;

  commentCountEl.classList.add('hidden');
  loadCommentsBut.classList.add('hidden');

  imageEl.src = url;
  likesEl.textContent = likes;
  socialCaptionEl.textContent = description;

  totalCommentCountEl.textContent = comments.length.toString();
  commentsContainerEl.append(renderComments());
  updateShownCommentCountText();

  if (allComments.length) {
    commentCountEl.classList.remove('hidden');
  }

  if (!isShownAllComments()) {
    loadCommentsBut.classList.remove('hidden');
  }
};

const onLoadCommentsClick = (evt) => {
  evt.preventDefault();

  commentCountEl.append(renderComments());
  updateShownCommentCountText();

  if (isShownAllComments()) {
    loadCommentsBut.classList.add('hidden');
  }
};

const onPicturesContainerClick = (evt) => {
  const pictureEl = evt.target.closest('.picture');

  if (pictureEl) {
    evt.preventDefault();
    const pictureId = Number.parseInt(pictureEl.dataset.pictureId, 10);

    renderPicture(getPhotoById(pictureId));
    bigPictureModal.show();
  }
};

loadCommentsBut.addEventListener('click', onLoadCommentsClick);

export {onPicturesContainerClick};
