import getNetworkRequest from './networkRequest.js';

// Деструктируем данные, формирующиеся в парсере, чтобы достать посты
const splitData = (url, i18nInstance) => getNetworkRequest(url, i18nInstance).then((promise) => {
  const [, postsData] = promise;
  return postsData;
});

const getNewPosts = (newPost, prevPosts) => newPost
  .filter((element) => prevPosts
    .findIndex((el) => el.title === element.title) === -1);

const checkNewPosts = (urls, prevPosts, i18nInstance) => {
  const newPosts = urls
    .reduce((acc, url) => [...acc, splitData(url, i18nInstance)
      .then((promise) => getNewPosts(promise, prevPosts))], []);
  return newPosts;
};

export default checkNewPosts;
