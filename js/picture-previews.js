import {createPhotos} from './data.js';

let photos = createPhotos();
let pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const createPreview = ({ id, url, description, likes, comments }) => {
  const pictureEl = pictureTemplate.cloneNode(true);
  const pictureImage = pictureEl.querySelector('.picture__img');
  const pictureLikes = pictureEl.querySelector('.picture__likes');
  const pictureComments = pictureEl.querySelector('.picture__comments');

  pictureEl.dataset.pictureId = id;
  pictureImage.src = url;
  pictureImage.alt = description;

  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return pictureEl;
};

const createPhotoPreviews = () => {
  const picturesFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    picturesFragment.append(createPreview(photo));
  });

  return picturesFragment;
};

const getPhotoById = (photoId) => photos.find(({id}) => id === photoId);


export {createPhotoPreviews, getPhotoById};
