import {createPhoto} from './data.js';

let photos = createPhoto();
let picturesContainer = document.querySelector('.pictures');
let pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
let pictureFragment = document.createDocumentFragment();


photos.forEach(({url, description, likes, comment}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImage = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureImage.src = url;
  pictureImage.alt = description;

  pictureLikes.textContent = likes;
  pictureComments.textContent = comment.length;

  pictureFragment.append(pictureElement);

});


picturesContainer.append(pictureFragment);
