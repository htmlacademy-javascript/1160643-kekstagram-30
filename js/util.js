

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

const isEscapeKey = ({key}) => key === 'Escape';

export {
  getRandomInteger,
  getId,
  createRandomRangeGenerator,
  getRandomArrayItem,
  isEscapeKey,
};
