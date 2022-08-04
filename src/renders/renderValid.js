import isEmpty from 'lodash/isEmpty.js';
import i18nInstance from '../locales/interpreter.js';

export default (state, currentValid) => {
  const input = document.querySelector('input[name="url"]');
  input.value = '';
  input.focus();
  const parent = input.closest('.text-white');
  const pEl = document.createElement('p');
  if (isEmpty(currentValid)) {
    input.classList.remove('is-invalid');
    pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-success');
    state.registrationForm.urls.push(state.registrationForm.currentURL);
    pEl.textContent = i18nInstance(state.lng, 'success');
    (parent.querySelector('.feedback'));
    if (parent.querySelector('.feedback')) {
      parent.replaceChild(pEl, parent.querySelector('.feedback'));
    } else {
      parent.append(pEl);
    }
  } else {
    input.classList.add('is-invalid');
    pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
    pEl.textContent = state.registrationForm.state.message;
    if (parent.querySelector('.feedback')) {
      parent.replaceChild(pEl, parent.querySelector('.feedback'));
    } else {
      parent.append(pEl);
    }
  }
};
