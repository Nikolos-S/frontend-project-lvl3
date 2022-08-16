import parserData from './parser.js';
import filterData from './filtresData.js';

// Деструктируем данные, формирующиеся в парсере, чтобы достать посты
const splitData = (url) => parserData(url).then((promise) => {
  const [, postsData] = promise;
  return postsData;
});

const checkList = (urls, posts) => {
  const parseUrls = urls
    .reduce((acc, url) => [...acc, splitData(url)
      .then((promise) => filterData(promise, posts))], []);
  return parseUrls;
};

export default checkList;
