import update from './update.js';
import i18nInstance from '../locales/interpreter.js';
import filterData from '../filtresData.js';

export default (posts, prevPosts, lng, elements) => {
  // elements.block.submit.disabled = false;
  if (!elements.containerPosts.querySelector('ul')) {
    elements.containerPosts.innerHTML = `<div><div><h2>${i18nInstance(lng, 'posts')}</h2></div><ul></ul></div>`;
    const divBorder = elements.containerPosts.querySelector('div');
    divBorder.classList.add('card', 'border-0');
    const divBody = divBorder.querySelector('div');
    divBody.classList.add('card-body');
    elements.containerPosts.querySelector('h2').classList.add('card-title', 'h4');
    const ulEl = elements.containerPosts.querySelector('ul');
    ulEl.classList.add('list-group', 'border-0', 'rounded-0');
  }
  const currentPost = filterData(posts, prevPosts);
  update(currentPost, i18nInstance(lng, 'vewing'));
};
