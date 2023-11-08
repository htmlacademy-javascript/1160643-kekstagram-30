import {getRandomInteger, getId, createRandomRangeGenerator, getRandomArrayItem} from "./util.js"

const NAMES = [
  'Алёна',
  'Вячеслав',
  'Людмила',
  'Василий',
  'Анна',
  'Эдуард',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Иметь мягкое сердце в жестоком мире — это сила, а не слабость',
  'Пятница — мое второе любимое слово',
  'Будьте счастливы. Это сводит людей с ума',
  'Не взрослей... Это ловушка!',
  'Сияй, бриллиант, не заставляй меня ждать еще один день',
  'Любовь не признает барьеров - Майя Анжелу',
];

const PUBLISHED_PHOTOS_COUNT = 25;
const MAX_COMMENTS_COUNT = 30;

const createRandomPhotoId = createRandomRangeGenerator(1, PUBLISHED_PHOTOS_COUNT);
const createRandomPhotoUrlId = createRandomRangeGenerator(1, PUBLISHED_PHOTOS_COUNT);
const generateCommentId = getId();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayItem(MESSAGES),
  name: getRandomArrayItem(NAMES),
});

const createPhoto = () => {
  const comments = Array.from({ length: getRandomInteger(0, MAX_COMMENTS_COUNT) })
  .map(createComment);

  return {
    id: createRandomPhotoId(),
    url: `photos/${ createRandomPhotoUrlId() }.jpg`,
    description: getRandomArrayItem(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments,
  };
};

Array
.from({length: PUBLISHED_PHOTOS_COUNT})
.map(createPhoto);

export {createPhoto};
