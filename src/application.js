import i18n from 'i18next';
import uniqueId from 'lodash/uniqueId.js';
import watch from './view/index.js';
import resources from './locales/index.js';
import controllerSubmit from './controllerSubmit.js';
import controllerClick from './controllerClick.js';
import getNetworkRequest from './utilityPrograms/networkRequest.js';
import parse from './utilityPrograms/parse.js';

const application = () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    block: {
      submit: document.querySelector('[type="submit"]'),
    },
    containerFeeds: document.querySelector('.feeds'),
    containerPosts: document.querySelector('.posts'),
    modalWindow: document.querySelector('#modal'),
    input: document.querySelector('input[name="url"]'),
  };
  const defaultLanguage = 'ru';
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    resources,
  });
  const state = {
    lng: defaultLanguage,
    processState: 'filling',
    error: null,
    viewedLinkIds: new Set(),
    currentPost: null,
    data: {
      feeds: [],
      posts: [],
    },
  };

  const watchedState = watch(state, elements, i18nInstance);

  const updateListPosts = (feeds) => {
    const urls = feeds.map((feed) => feed.urlFeed);
    const promises = urls.map((url) => getNetworkRequest(url)
      .then((data) => {
        const [, postsData] = parse(url, data);
        postsData.filter((post) => state.data.posts
          .findIndex((prevPost) => prevPost.title === post.title) === -1);
        postsData.forEach((post) => {
          post.id = uniqueId();
        });
        watchedState.data.posts.push(...postsData);
      }));
    Promise.all(promises).finally(() => {
      setTimeout(() => updateListPosts(feeds), 5000);
    });
  };

  controllerSubmit(state, elements, watchedState);
  controllerClick(state, elements, watchedState);

  updateListPosts(state.data.feeds);
};

export default application;
