import { getPhotoById } from "./picture-previews";
import { isEscapeKey} from "./util";

const pictureModalEl = document.querySelector('big-picture');
const imageEl = pictureModalEl.querySelector('.big-picture__img img');
const likesEl = pictureModalEl.querySelector('.likes-count');
const commentCountEl = pictureModalEl.querySelector('.social__comment-count');
const shownCommentCountEl = commentCountEl.querySelector('.social__comment-shown-count');
const totalCommentCountEl = commentCountEl.querySelector('.social__comment-total-count');
const commentsContainerEl = pictureModalEl.querySelector('.social__comments');
const loadCommentsBut = pictureModalEl.querySelector('.comments-loader');
const socialCaptionEl = pictureModalEl.querySelector('.social__caption');
const closePictureModalEl = pictureModalEl.querySelector('.big-picture__cancel');

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

  comments.forEach((comment) => {
    commentsFragment.append(createCommentEl(comment));
  });

  return commentsFragment;
};

const renderPicture = ({url, likes, comments, description}) => {
  commentCountEl.classList.add('hidden');
  loadCommentsBut.classList.add('hidden');

  imageEl.src = url;
  likesEl.textContent = likes;
  shownCommentCountEl.textContent = '?';
  totalCommentCountEl.textContent = photo.comments.length.toString(10);

  commentsContainerEl.innerHTML = '';
  commentsContainerEl.append(renderComments(comments));
  socialCaptionEl.textContent = description;
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const onPicturesContainerClick = (evt) => {
  const pictureEl = evt.target.closest('.picture');

  if (pictureEl) {
    const pictureId = Number.parseInt(pictureEl.dataset.pictureId, 10);

    renderPicture(getPhotoById(pictureId));
    openPhotoModal();
  }
};

function openPhotoModal() {
  pictureModalEl.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
}

function closePhotoModal() {
  pictureModalEl.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
};

closePictureModalEl.addEventListener('click', () => {
  closePhotoModal();
});

export {onPicturesContainerClick};
