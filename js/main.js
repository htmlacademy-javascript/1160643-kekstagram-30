// результат
// {
//   id: 135,
//   avatar: 'img/avatar-6.svg',
//   message: 'В целом всё неплохо. Но не всё.',
//   name: 'Артём',
// }


// id - число от 1 до 25
// url - строка от 1 до 25
// description - строка 'самая красивая', 'это я', 'отдыхаю', 'теперь я на работе'
// likes - число от 15 до 200


// comments - число от 0 до 30
// message - массив 'Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// id comment - число от 1 до 30 (не повторяются)
// avatar - строка от 1 до 6 подставляется в строку img/avatar-{{число}}.svg.
// name - массив 'Алёна', 'Вячеслав', 'Людмила', 'Василий', 'Анна', 'Эдуард'

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

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getId = () => {
  let id = 0;
  return function () {
    id += 1;
    return id;
  }
}

const createRandomRangeGenerator = function (min, max) {
  const previousId = [];

  return function () {
    if (previousId.length > max - min + 1) {
      return null;
    }

    let currentId = getRandomInteger(min, max);

    while (previousId.includes(currentId)) {
      currentId = getRandomInteger(min, max)
    }

    previousId.push(currentId);

    return currentId;
  };
};

const getRandomArrayItem = function (items) {
  const randomIndex = getRandomInteger(0, items.length - 1);

  return items[randomIndex];
};

const PUBLISHED_PHOTOS_COUNT = 25;
const MAX_COMMENTS_COUNT = 30;

const createRandomPhotoId = createRandomRangeGenerator(0, PUBLISHED_PHOTOS_COUNT);
const createRandomPhotoUrlId = createRandomRangeGenerator(0, PUBLISHED_PHOTOS_COUNT);
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

console.log(createPhoto());


