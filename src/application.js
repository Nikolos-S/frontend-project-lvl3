import i18n from 'i18next';
import watch from './view/index.js';
import resources from './locales/index.js';
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
      urls: [],
      feeds: [],
      posts: [],
    },
  };

  const watchedState = watch(state, elements, i18nInstance);

  controllerSubmit(state, elements, watchedState, i18nInstance);
  controllerClick(state, elements, watchedState);
};

export default application;
