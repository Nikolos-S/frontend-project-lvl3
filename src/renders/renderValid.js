import buildFeed from './buildFeed.js';
import buildPosts from './buildPosts.js';

export default (data, success, feed, post) => {
  const input = document.querySelector('input[name="url"]');
  input.value = '';
  input.focus();
  const parent = input.closest('.text-white');
  const pEl = document.createElement('p');
  pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small');
  input.classList.remove('is-invalid');
  pEl.classList.add('text-success');
  pEl.textContent = success;
  parent.replaceChild(pEl, parent.querySelector('.feedback'));
  buildFeed(data.feeds, feed);
  buildPosts(data.posts, post);
};
