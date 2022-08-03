import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty.js';
import onChange from 'on-change';

const validate = (url, urls) => {
  const schema = yup.string().trim()
    .url('должен быть действительный URL-адрес')
    .required('Вы пропустили это поле')
    .notOneOf([urls], 'RSS уже существует');
  return schema.validate(url)
    .then(() => {}).catch((err) => err);
};

const application = () => {
  const state = {
    registrationForm: {
      state: null,
      urls: [],
      currentURL: null,
    },
  };

  const watchedState = onChange(state, (path, currentValid) => {
    const input = document.querySelector('input[name="url"]');
    input.value = '';
    const parent = input.closest('.text-white');
    const pEl = document.createElement('p');
    if (isEmpty(currentValid)) {
      input.classList.remove('is-invalid');
      pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-success');
      state.registrationForm.urls.push(state.registrationForm.currentURL);
      pEl.textContent = 'RSS успешно загружен';
      (parent.querySelector('.feedback'));
      if (parent.querySelector('.feedback')) {
        parent.replaceChild(pEl, parent.querySelector('.feedback'));
      } else {
        parent.append(pEl);
      }
      console.log(state.registrationForm.urls);
    } else {
      console.log(state.registrationForm.state);
      input.classList.add('is-invalid');
      pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
      pEl.textContent = state.registrationForm.state.message;
      if (parent.querySelector('.feedback')) {
        parent.replaceChild(pEl, parent.querySelector('.feedback'));
      } else {
        parent.append(pEl);
      }
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
};

export default application;
