import {createPhotoPreviews} from './picture-previews.js';
import {onPicturesContainerClick} from './picture-modal.js';

const picturesContainerEl = document.querySelector('.pictures');

picturesContainerEl.append(createPhotoPreviews());
picturesContainerEl.addEventListener('click', onPicturesContainerClick);


