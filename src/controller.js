import onChange from 'on-change';
import * as yup from 'yup';
import renderVAlid from './renders/renderValid.js';
import renderNoValid from './renders/renderNoValid';
import renderLang from './renders/renderLang.js';
import parser from './renders/parser.js';
import i18nInstance from './locales/interpreter.js';

const application = () => {
  const defaultLanguage = 'ru';
  const state = {
    lng: defaultLanguage,
    registrationForm: {
      state: {
        error: null,
        success: null,
      },
      urls: [],
      currentURL: null,
    },
    data: {
      feeds: [],
      posts: [],
    },
  };

  const validate = (url, urls) => {
    const schema = yup.string().trim()
      .url(i18nInstance(state.lng, 'errURL'))
      .required(i18nInstance(state.lng, 'errRequired'))
      .notOneOf([urls], i18nInstance(state.lng, 'repleated'));
    return schema.validate(url)
      .then(() => true).catch((err) => err);
  };

  const watchedState = onChange(state, (path, currentValid) => {
    switch (path) {
      case 'registrationForm.state.success':
        return renderVAlid(state.data, currentValid, i18nInstance(state.lng, 'feeds'));
      case 'registrationForm.state.error':
        return renderNoValid(currentValid);
      case 'lng':
        return renderLang();
      default:
        return null;
    }
  });

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    state.registrationForm.state.error = null;
    state.registrationForm.state.success = null;
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    state.registrationForm.currentURL = url;
    const data = state.registrationForm.urls;
    validate(url, data).then((err) => {
      console.log(err);
      if (err === true) {
        parser(state).then((parserData) => {
          const [feedData, postsData] = parserData;
          state.data.feeds.push(feedData);
          state.data.posts.push(...postsData);
          state.registrationForm.urls.push(state.registrationForm.currentURL);
          watchedState.registrationForm.state.success = i18nInstance(state.lng, 'success');
        });
        // console.log(state.data);
      }
      watchedState.registrationForm.state.error = err;
      console.log(state);
    });
  });

  const divLanguage = document.querySelector('#language');
  const languages = divLanguage.querySelectorAll('button');
  languages.forEach((language) => {
    language.addEventListener('click', (e) => {
      watchedState.lng = e.target.id;
      e.preventDefault();
    });
  });
};

export default application;
