import parserData from './parser.js';

// Деструктируем данные, формирующиеся в парсере, чтобы достать посты
const splitData = (url) => parserData(url).then((promise) => {
  const [, postsData] = promise;
  return postsData;
});

// Фильтруем данные. Нам нужны только те посты, которых нет в стейте,
// для дальнейшего добавления в стейт и отрисовку
const filterData = (currentPost, posts) => currentPost
  .filter((element) => posts
    .findIndex((el) => el.title === element.title) === -1);

const checkList = (urls, posts) => {
  const parseUrls = urls
    .reduce((acc, url) => [...acc, splitData(url)
      .then((promise) => filterData(promise, posts))], []);
  return parseUrls;
};

export default checkList;
