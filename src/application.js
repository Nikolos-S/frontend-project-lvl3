import onChange from 'on-change';
import render from './view/index.js';
import controllerSubmit from './controllerSubmit.js';
import controllerClick from './controllerClick.js';

const application = () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    block: {
      submit: document.querySelector('[type="submit"]'),
      input: document.querySelector('#url-input'),
    },
    containerFeeds: document.querySelector('.feeds'),
    containerPosts: document.querySelector('.posts'),
    modalWindow: document.querySelector('#modal'),
    input: document.querySelector('input[name="url"]'),
  };
  const defaultLanguage = 'ru';
  const state = onChange({
    lng: defaultLanguage,
    processState: 'filling',
    error: null,
    useId: [],
    currentPost: null,
    data: {
      urls: [],
      feeds: [],
      posts: [],
    },
  }, (path, currentValue, prevValue) => render(state, path, currentValue, prevValue, elements));

  controllerSubmit(state, elements);
  controllerClick(state, elements);
};

export default application;
