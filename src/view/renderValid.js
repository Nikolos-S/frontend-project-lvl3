import buildFeed from './buildFeed.js';
import i18nInstance from '../locales/interpreter.js';

export default (feeds, lng, elements) => {
  elements.input.value = '';
  elements.input.focus();
  const parent = elements.input.closest('.text-white');
  const pEl = document.createElement('p');
  pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small');
  elements.input.classList.remove('is-invalid');
  pEl.classList.add('text-success');
  pEl.textContent = i18nInstance(lng, 'success');
  parent.replaceChild(pEl, parent.querySelector('.feedback'));
  buildFeed(feeds, i18nInstance(lng, 'feeds'), elements);
};
