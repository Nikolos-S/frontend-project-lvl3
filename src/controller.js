import onChange from 'on-change';
import * as yup from 'yup';
import renderVAlid from './renders/renderValid.js';
import renderLang from './renders/renderLang.js';
import i18nInstance from './locales/interpreter.js';

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

  const validate = (url, urls) => {
    const schema = yup.string().trim()
      .url(i18nInstance(state.lng, 'errURL'))
      .required(i18nInstance(state.lng, 'errRequired'))
      .notOneOf([urls], i18nInstance(state.lng, 'repleated'));
    return schema.validate(url)
      .then(() => {}).catch((err) => err);
  };

  const watchedState = onChange(state, (path, currentValid) => {
    switch (path) {
      case 'registrationForm.state':
        return renderVAlid(state, currentValid);
      case 'lng':
        return renderLang();
      default:
        return null;
    }
  });

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const data = state.registrationForm.urls;
    state.registrationForm.currentURL = url;
    validate(url, data).then((err) => {
      watchedState.registrationForm.state = err;
    });
  });

  const divLanguage = document.querySelector('#language');
  const languages = divLanguage.querySelectorAll('button');
  languages.forEach((language) => {
    language.addEventListener('click', (e) => {
      watchedState.lng = e.target.id;
    });
  });
};

export default application;
