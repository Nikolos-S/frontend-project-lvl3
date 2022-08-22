// import onChange from 'on-change';
import watch from './view/index.js';
import controllerSubmit from './controllerSubmit.js';
import controllerClick from './controllerClick.js';

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
  const state = {
    lng: defaultLanguage,
    processState: 'filling',
    error: null,
    viewedLinkIds: new Set(),
    currentPost: null,
    data: {
      urls: [],
      feeds: [],
      posts: [],
    },
  };

  const watchedState = watch(state, elements);

  controllerSubmit(state, elements, watchedState);
  controllerClick(state, elements, watchedState);
};

export default application;
