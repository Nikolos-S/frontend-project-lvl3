import * as yup from 'yup';
import parserData from './parser.js';
import i18nInstance from './locales/interpreter.js';
import checkList from './checkList.js';

export default (state) => {
  const schema = yup.string().trim()
    .url(i18nInstance(state.lng, 'errURL'))
    .required(i18nInstance(state.lng, 'errRequired'))
    .notOneOf([state.urls], i18nInstance(state.lng, 'repleated'));

  const check = () => {
    setTimeout(() => {
      checkList(state.urls, state.data.posts)
        .forEach((promise) => promise
          .then((filtrData) => {
            state.data.posts.push(...filtrData);
            console.log(filtrData);
          }));
      check();
    }, 5000);
  };

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    state.currentURL = url;
    schema.validate(url)
      .then(() => {
        state.urls.push(state.currentURL);
        parserData(url).then((promiseNormalizeData) => {
          const [feedData, postsData] = promiseNormalizeData;
          state.data.feeds.push(feedData);
          state.data.posts.push(...postsData);
          check();
        });
      }).catch((err) => {
        state.error = err;
      });
  });
};
