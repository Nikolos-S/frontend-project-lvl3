import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId.js';
import parserData from './parser.js';
import i18nInstance from './locales/interpreter.js';
import checkList from './checkList.js';

export default (state, elements) => {
  const schema = yup.string().trim()
    .url(i18nInstance(state.lng, 'errURL'))
    .required(i18nInstance(state.lng, 'errRequired'))
    .notOneOf([state.data.urls], i18nInstance(state.lng, 'repleated'));

  const checkNewPost = () => {
    setTimeout(() => {
      checkList(state.data.urls, state.data.posts)
        .forEach((promise) => promise
          .then((filtrData) => {
            filtrData.forEach((post) => {
              post.id = uniqueId();
            });
            state.data.posts.push(...filtrData);
          }));
      checkNewPost();
    }, 5000);
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    elements.submit.disabled = false;
    const formData = new FormData(e.target);
    const url = formData.get('url');
    schema.validate(url)
      .then(() => {
        parserData(url).catch((error) => {
          state.error = error;
        }).then((promiseNormalizeData) => {
          const [feedData, postsData] = promiseNormalizeData;
          postsData.forEach((post) => {
            post.id = uniqueId();
          });
          state.data.feeds.push(feedData);
          state.data.posts.push(...postsData);
          state.data.urls.push(feedData.urlFeed);
        });
      }).catch((err) => {
        state.error = err;
      });
  });
  checkNewPost();
};