import parserData from './parser.js';

const assignId = (url, feeds) => {
  const indexUrl = feeds.findIndex((feed) => feed.urlFeed === url);
  // const idFeed = (indexUrl === -1) ? uniqueId() : indexUrl + 1;
  return indexUrl + 1;
};

const splitData = (url, feeds) => parserData(url).then((promise) => {
  const [, postsData] = promise;
  postsData.forEach((post) => {
    post.feedId = assignId(url, feeds);
  });
  return postsData;
});

const checkList = (urls, posts, feeds) => {
  const parseUrls = urls
    .reduce((acc, url) => [...acc, splitData(url, feeds).then((promise) => promise
      .filter((element) => posts
        .findIndex((el) => el.title === element.title) === -1))], []);
  return parseUrls;
};

export default checkList;
