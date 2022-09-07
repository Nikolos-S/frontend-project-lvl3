import * as yup from 'yup';
import getNetworkRequest from './utilityPrograms/networkRequest.js';
import parse from './utilityPrograms/parse.js';

export default (state, elements, watchedState) => {
  const getUrls = (feeds) => feeds.map((feed) => feed.urlFeed);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    elements.block.submit.disabled = true;
    watchedState.processState = 'sending';
    const formData = new FormData(e.target);
    const url = formData.get('url');

    const schema = yup.string()
      .url('errURL')
      .required('errRequired')
      .notOneOf([getUrls(state.data.feeds)], 'repleated');

    schema.validate(url)
      .then(() => {
        getNetworkRequest(url).then((data) => {
          const [feedData, postsData] = parse(url, data);
          watchedState.data.feeds.push(feedData);
          watchedState.data.posts.push(...postsData);
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
};
