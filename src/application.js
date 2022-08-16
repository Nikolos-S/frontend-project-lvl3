import onChange from 'on-change';
import render from './view/index.js';
import controllerSubmit from './controllerSubmit.js';
import controllerClick from './controllerClick.js';

const application = () => {
  const defaultLanguage = 'ru';
  const state = onChange({
    lng: defaultLanguage,
    error: null,
    useId: [],
    currentPost: null,
    data: {
      urls: [],
      feeds: [],
      posts: [],
    },
  }, (path, currentValue, prevValue) => render(state, path, currentValue, prevValue));

  controllerSubmit(state);
  controllerClick(state);
};

export default application;
