import update from './view/update.js';
import i18nInstance from './locales/interpreter.js';

const filterData = (currentPost, prevPosts) => currentPost
  .filter((element) => prevPosts
    .findIndex((el) => el.title === element.title) === -1);

export default (posts, prevPosts, lng) => {
  const container = document.querySelector('.posts');
  if (!container.querySelector('ul')) {
    container.innerHTML = `<div><div><h2>${i18nInstance(lng, 'posts')}</h2></div><ul></ul></div>`;
    const divBorder = container.querySelector('div');
    divBorder.classList.add('card', 'border-0');
    const divBody = divBorder.querySelector('div');
    divBody.classList.add('card-body');
    container.querySelector('h2').classList.add('card-title', 'h4');
    const ulEl = container.querySelector('ul');
    ulEl.classList.add('list-group', 'border-0', 'rounded-0');
  }
  const currentPost = filterData(posts, prevPosts);
  update(currentPost, i18nInstance(lng, 'vewing'));
};
