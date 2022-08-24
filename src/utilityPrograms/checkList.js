import getNetworkRequest from './networkRequest.js';

// Деструктируем данные, формирующиеся в парсере, чтобы достать посты
const splitData = (url, i18nInstance) => getNetworkRequest(url, i18nInstance).then((promise) => {
  const [, postsData] = promise;
  return postsData;
});

const filterData = (currentPost, posts) => currentPost
  .filter((element) => posts
    .findIndex((el) => el.title === element.title) === -1);

const checkList = (urls, posts, i18nInstance) => {
  const parseUrls = urls
    .reduce((acc, url) => [...acc, splitData(url, i18nInstance)
      .then((promise) => filterData(promise, posts))], []);
  return parseUrls;
};

export default checkList;
