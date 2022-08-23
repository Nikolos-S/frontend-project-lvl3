import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId.js';
import isEmpty from 'lodash/isEmpty.js';
import getNetworkRequest from './networkRequest.js';
import i18nInstance from './locales/interpreter.js';
import checkList from './checkList.js';

export default (state, elements, watchedState) => {
  const schema = yup.string().trim()
    .url(i18nInstance(state.lng, 'errURL'))
    .required(i18nInstance(state.lng, 'errRequired'))
    .notOneOf([state.data.urls], i18nInstance(state.lng, 'repleated'));

  const checkNewPost = () => {
    setTimeout(() => {
      checkList(state.data.urls, state.data.posts, i18nInstance(state.lng, 'netErr'))
        .forEach((promise) => promise
          .then((filtrData) => {
            filtrData.forEach((post) => {
              post.id = uniqueId();
            });
            watchedState.data.posts.push(...filtrData);
          }));
      checkNewPost();
    }, 5000);
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    elements.block.submit.disabled = true;
    watchedState.processState = 'sending';
    const formData = new FormData(e.target);
    const url = formData.get('url');
    schema.validate(url)
      .then(() => {
        getNetworkRequest(url, i18nInstance(state.lng, 'netErr')).then((promiseNormalizeData) => {
          if (isEmpty(promiseNormalizeData)) {
            watchedState.error = promiseNormalizeData;
            watchedState.processState = 'error';
          } else {
            const [feedData, postsData] = promiseNormalizeData;
            postsData.forEach((post) => {
              post.id = uniqueId();
            });
            watchedState.data.feeds.push(feedData);
            watchedState.data.posts.push(...postsData);
            watchedState.data.urls.push(feedData.urlFeed);
            watchedState.processState = 'sent';
          }
        });
      }).catch((err) => {
        watchedState.error = err;
        watchedState.processState = 'error';
      });
  });
  checkNewPost();
};

/*
watchedState.error = error;
watchedState.processState = 'error'; // в случае, если валидный url, но не является rss каналом.
*/
