// 1. Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы.
function truncate(string, maxlength) {
  return (string.length <= maxlength) ? true : false;
}
// 2. Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
function palindrome(string) {
  let normalString = string.toLowerCase().replace(/\W/g, '');
  let newString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    newString += normalString[i];
  }
  return newString === normalString;
}
