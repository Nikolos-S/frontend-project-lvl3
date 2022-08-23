import getNetworkRequest from './networkRequest.js';

// Деструктируем данные, формирующиеся в парсере, чтобы достать посты
const splitData = (url, netErr) => getNetworkRequest(url, netErr).then((promise) => {
  const [, postsData] = promise;
  return postsData;
});

const filterData = (currentPost, posts) => currentPost
  .filter((element) => posts
    .findIndex((el) => el.title === element.title) === -1);

const checkList = (urls, posts, netErr) => {
  const parseUrls = urls
    .reduce((acc, url) => [...acc, splitData(url, netErr)
      .then((promise) => filterData(promise, posts))], []);
  return parseUrls;
};

export default checkList;
