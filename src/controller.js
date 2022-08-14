import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId.js';
import parserData from './parser.js';
import i18nInstance from './locales/interpreter.js';
import checkList from './checkList.js';

export default (state) => {
  const schema = yup.string().trim()
    .url(i18nInstance(state.lng, 'errURL'))
    .required(i18nInstance(state.lng, 'errRequired'))
    .notOneOf([state.data.urls], i18nInstance(state.lng, 'repleated'));

  const check = () => {
    setTimeout(() => {
      checkList(state.data.urls, state.data.posts, state.data.feeds)
        .forEach((promise) => promise
          .then((filtrData) => {
            state.data.posts.push(...filtrData);
          }));
      check();
    }, 5000);
  };

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    schema.validate(url)
      .then(() => {
        parserData(url).catch((error) => {
          state.error = error;
        }).then((promiseNormalizeData) => {
          const [feedData, postsData] = promiseNormalizeData;
          const idFeed = uniqueId();
          feedData.id = idFeed;
          postsData.forEach((post) => {
            post.feedId = idFeed;
          });
          state.data.feeds.push(feedData);
          state.data.posts.push(...postsData);
          state.data.urls.push(feedData.urlFeed);
        });
      }).catch((err) => {
        state.error = err;
      });
  });
  check();
};
