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

/*
.reduce((acc, document) => [...acc, document.then((promise) => promise
      .filter((element) => posts
        .findIndex((el) => el.title === element.title) === -1))], []);
  console.log(parseUrls);

const checkNewPosts = (state, period = postsCheckInterval) => {
  let data = state.feedsData;
  const promises = state.links.map((link) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
    .then((response) => {
      const { contents } = response.data;
      const parsedDocument = parser(contents);
      data = normalizeData(parsedDocument, data);
    }));

  Promise.all(promises).then(() => {
    state.feedsData = data;
    setListeners(state);
    setTimeout(() => checkNewPosts(state), period);
  });
};
*/
