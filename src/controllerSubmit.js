import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId.js';
import getNetworkRequest from './utilityPrograms/networkRequest.js';
import checkNewPosts from './utilityPrograms/checkNewPosts.js';

export default (state, elements, watchedState, i18nInstance) => {
  const schema = yup.string().trim()
    .url(i18nInstance.t('errURL'))
    .required(i18nInstance.t('errRequired'))
    .notOneOf([state.data.urls], i18nInstance.t('repleated'));

  const checkNewPost = () => {
    setTimeout(() => {
      checkNewPosts(state.data.urls, state.data.posts, i18nInstance)
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
        getNetworkRequest(url, i18nInstance).then((promiseNormalizeData) => {
          const [feedData, postsData] = promiseNormalizeData;
          postsData.forEach((post) => {
            post.id = uniqueId();
          });
          watchedState.data.feeds.push(feedData);
          watchedState.data.posts.push(...postsData);
          watchedState.data.urls.push(feedData.urlFeed);
          watchedState.processState = 'sent';
        }).catch((rssErr) => {
          watchedState.error = rssErr.message;
          watchedState.processState = 'error';
        });
      }).catch((err) => {
        watchedState.error = err.message;
        watchedState.processState = 'error';
      });
  });
  checkNewPost();
};
