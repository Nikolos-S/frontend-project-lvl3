import onChange from 'on-change';
import * as yup from 'yup';
import renderVAlid from './renders/renderValid.js';
import renderNoValid from './renders/renderNoValid';
import parserData from './renders/parser.js';
import normalizDataFeed from './renders/normalizDataFeed.js';
import normalizDataPost from './renders/normalizDataPost.js';
import i18nInstance from './locales/interpreter.js';
import checkList from './renders/checkList.js';
import update from './renders/update.js';

const application = () => {
  const defaultLanguage = 'ru';
  const state = {
    lng: defaultLanguage,
    registrationForm: {
      state: {
        error: null,
      },
      urls: [],
      currentURL: null,
    },
    data: {
      feeds: [],
      posts: [],
    },
  };

  const schema = yup.string().trim()
    .url(i18nInstance(state.lng, 'errURL'))
    .required(i18nInstance(state.lng, 'errRequired'))
    .notOneOf([state.registrationForm.urls], i18nInstance(state.lng, 'repleated'));

  const watchedState = onChange(state, (path, currentValid) => {
    switch (path) {
      case 'data.feeds':
        return renderVAlid(currentValid, state.data.posts, state.lng);
      case 'data.posts':
        return update(currentValid, i18nInstance(state.lng, 'vewing'));
      case 'registrationForm.state.error':
        return renderNoValid(currentValid);
      default:
        return null;
    }
  });

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    state.registrationForm.state.error = null;
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    state.registrationForm.currentURL = url;
    const ListUrl = state.registrationForm.urls;
    schema.validate(url)
      .then(() => {
        ListUrl.push(state.registrationForm.currentURL);
        parserData(url).then((normalized) => {
          state.data.posts.push(...normalizDataPost(normalized));
          watchedState.data.feeds.push(normalizDataFeed(normalized));
          checkList(ListUrl, state.data.posts).forEach((promise) => promise
            .then((filtrData) => state.data.posts.push(...filtrData)));
        });
      }).catch((err) => {
        watchedState.registrationForm.state.error = err;
      });
    const loops = () => {
      setTimeout(() => {
        checkList(state.registrationForm.urls, state.data.posts).forEach((promise) => promise
          .then((filtrData) => {
            watchedState.data.posts.push(...filtrData);
          }));
        loops();
      }, 5000);
    };
    loops();
  });
};

export default application;
