import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId.js';
import getNetworkRequest from './utilityPrograms/networkRequest.js';
import checkNewPosts from './utilityPrograms/checkNewPosts.js';
import parse from './utilityPrograms/parse.js';

export default (state, elements, watchedState) => {
  const schema = yup.string()
    .url('errURL')
    .required('errRequired')
    .notOneOf([state.data.urls], 'repleated');

  const updateListPosts = (url) => {
    const newPosts = checkNewPosts(url, state.data.posts)
      .then((list) => {
        list.forEach((post) => {
          post.id = uniqueId();
        });
        watchedState.data.posts.push(...list);
      });
    setTimeout(() => {
      newPosts.finally(updateListPosts(url));
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
        getNetworkRequest(url).then((data) => parse(url, data)).then((promiseNormalizeData) => {
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
    updateListPosts(url);
  });
};
