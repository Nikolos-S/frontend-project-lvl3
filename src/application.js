import onChange from 'on-change';
import render from './view/index.js';
import controller from './controller.js';

const application = () => {
  const defaultLanguage = 'ru';
  const state = onChange({
    lng: defaultLanguage,
    error: null,
    data: {
      urls: [],
      feeds: [],
      posts: [],
    },
  }, render(defaultLanguage));

  controller(state);
};

export default application;
