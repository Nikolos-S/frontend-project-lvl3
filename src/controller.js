import * as yup from 'yup';
import parserData from './parser.js';
import i18nInstance from './locales/interpreter.js';
import checkList from './checkList.js';

export default (state) => {
  const schema = yup.string().trim()
    .url(i18nInstance(state.lng, 'errURL'))
    .required(i18nInstance(state.lng, 'errRequired'))
    .notOneOf([state.urls], i18nInstance(state.lng, 'repleated'));

  const check = () => {
    setTimeout(() => {
      checkList(state.urls, state.data.posts)
        .forEach((promise) => promise
          .then((filtrData) => {
            state.data.posts.push(...filtrData);
            console.log(filtrData);
          }));
      check();
    }, 5000);
  };

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    state.currentURL = url;
    schema.validate(url)
      .then(() => {
        state.urls.push(state.currentURL);
        parserData(url).then((promiseNormalizeData) => {
          const [feedData, postsData] = promiseNormalizeData;
          state.data.feeds.push(feedData);
          state.data.posts.push(...postsData);
          check();
        });
      }).catch((err) => {
        state.error = err;
      });
  });
};

/*
const ListUrl = state.registrationForm.urls;
  schema.validate(url)
    .then(() => {
      ListUrl.push(state.registrationForm.currentURL);
      parserData(url).then((normalized) => {
        state.data.posts.push(...normalizDataPost(normalized));
        state.data.feeds.push(normalizDataFeed(normalized));
        checkList(ListUrl, state.data.posts).forEach((promise) => promise
          .then((filtrData) => state.data.posts.push(...filtrData)));
        const opens = document.querySelectorAll('button[data-toggle="modal"]');
        opens.forEach((open) => {
          open.addEventListener('click', () => {
            console.log(open);
          });
        });
      });
    }).catch((err) => {
      state.registrationForm.state.error = err;
    });
  const loops = () => {
    setTimeout(() => {
      checkList(state.registrationForm.urls, state.data.posts).forEach((promise) => promise
        .then((filtrData) => {
          state.data.posts.push(...filtrData);
          const opens = document.querySelectorAll('button[data-toggle="modal"]');
          opens.forEach((open) => {
            open.addEventListener('click', () => {
              console.log(open);
            });
          });
          // console.log(Promise.all(checkList(state.registrationForm.urls, state.data.posts)));
        }));
      loops();
    }, 5000);
  };
  loops();
  */
