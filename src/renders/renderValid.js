import buildFeed from './buildFeed.js';
import buildPosts from './buildPosts.js';
import i18nInstance from '../locales/interpreter.js';

export default (feeds, posts, lng) => {
  const input = document.querySelector('input[name="url"]');
  input.value = '';
  input.focus();
  const parent = input.closest('.text-white');
  const pEl = document.createElement('p');
  pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small');
  input.classList.remove('is-invalid');
  pEl.classList.add('text-success');
  pEl.textContent = i18nInstance(lng, 'success');
  parent.replaceChild(pEl, parent.querySelector('.feedback'));
  buildFeed(feeds, i18nInstance(lng, 'feeds'));
  buildPosts(posts, i18nInstance(lng, 'posts'), i18nInstance(lng, 'vewing'));
};
