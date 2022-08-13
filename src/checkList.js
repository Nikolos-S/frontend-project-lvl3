import parserData from './parser.js';

const splitData = (url) => parserData(url).then((promise) => {
  const [, postsData] = promise;
  return postsData;
});

const checkList = (urls, posts) => {
  const parseUrls = urls.reduce((acc, url) => [...acc, splitData(url).then((promise) => promise
    .filter((element) => posts
      .findIndex((el) => el.title === element.title) === -1))], []);
  return parseUrls;
};

export default checkList;
