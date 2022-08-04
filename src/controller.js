import onChange from 'on-change';
import validate from './validator.js';
import render from './render.js';

const application = () => {
  const defaultLanguage = 'ru';
  const state = {
    lng: defaultLanguage,
    registrationForm: {
      state: null,
      urls: [],
      currentURL: null,
    },
  };

  const watchedState = onChange(state, (path, currentValid) => {
    render(state);
  });

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const data = state.registrationForm.urls;
    state.registrationForm.currentURL = url;
    validate(url, data, state.lng).then((err) => {
      watchedState.registrationForm.state = err;
    });
  });
};

export default application;
