import onChange from 'on-change';
import * as yup from 'yup';
import renderVAlid from './renders/renderValid.js';
import renderNoValid from './renders/renderNoValid';
import parserData from './renders/parser.js';
import normalizDataFeed from './renders/normalizDataFeed.js';
import normalizDataPost from './renders/normalizDataPost.js';
// import checkList from './renders/checkList.js';
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

  const schema = yup.string().trim()
    .url(i18nInstance(state.lng, 'errURL'))
    .required(i18nInstance(state.lng, 'errRequired'))
    .notOneOf([state.registrationForm.urls], i18nInstance(state.lng, 'repleated'));

  const watchedState = onChange(state, (path, currentValid) => {
    switch (path) {
      case 'registrationForm.state.success':
        return renderVAlid(state.data, currentValid, i18nInstance(state.lng, 'feeds'), i18nInstance(state.lng, 'posts'), i18nInstance(state.lng, 'success'));
      case 'data.posts':
        return renderVAlid(state.data, currentValid, i18nInstance(state.lng, 'feeds'), i18nInstance(state.lng, 'posts'));
      case 'registrationForm.state.error':
        return renderNoValid(currentValid);
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
    const ListUrl = state.registrationForm.urls;
    schema.validate(url)
      .then(() => {
        ListUrl.push(state.registrationForm.currentURL);
        parserData(url).then((normalized) => {
          state.data.feeds.push(normalizDataFeed(normalized));
          state.data.posts.push(...normalizDataPost(normalized));
          watchedState.registrationForm.state.success = i18nInstance(state.lng, 'success');
        });
      }).catch((err) => {
        watchedState.registrationForm.state.error = err;
      });
  });
  const loops = () => {
    setTimeout(() => {
      parserData(state.registrationForm.currentURL).then((promise) => {
        console.log(promise);
        console.log(normalizDataPost(promise));
      });
      loops();
    }, 5000);
  };
  loops();
};

export default application;

/*
const loops = () => {
      setTimeout(() => {
        parserData(url).then((promise) => {
          console.log(url);
          console.log(promise);
          // console.log(normalizDataPost(promise));
        });
        loops();
      }, 5000);
    };
    loops();
*/
