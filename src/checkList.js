// import parserData from './parser.js';
import getNetworkRequest from './networkRequest.js';
import filterData from './filtresData.js';

// Деструктируем данные, формирующиеся в парсере, чтобы достать посты
const splitData = (url, netErr) => getNetworkRequest(url, netErr).then((promise) => {
  const [, postsData] = promise;
  return postsData;
});

const checkList = (urls, posts, netErr) => {
  const parseUrls = urls
    .reduce((acc, url) => [...acc, splitData(url, netErr)
      .then((promise) => filterData(promise, posts))], []);
  return parseUrls;
};

export default checkList;
