import {createPhotoPreviews} from './picture-previews.js';
import {onPicturesContainerClick} from './picture-modal.js';
import './up-form.js';

const picturesContainerEl = document.querySelector('.pictures');

picturesContainerEl.append(createPhotoPreviews());
picturesContainerEl.addEventListener('click', onPicturesContainerClick);


