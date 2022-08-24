import update from './update.js';

const filterData = (currentPost, posts) => currentPost
  .filter((element) => posts
    .findIndex((el) => el.title === element.title) === -1);

export default (posts, prevPosts, i18nInstance, elements) => {
  if (!elements.containerPosts.querySelector('ul')) {
    elements.containerPosts.innerHTML = `<div><div><h2>${i18nInstance.t('posts')}</h2></div><ul></ul></div>`;
    const divBorder = elements.containerPosts.querySelector('div');
    divBorder.classList.add('card', 'border-0');
    const divBody = divBorder.querySelector('div');
    divBody.classList.add('card-body');
    elements.containerPosts.querySelector('h2').classList.add('card-title', 'h4');
    const ulEl = elements.containerPosts.querySelector('ul');
    ulEl.classList.add('list-group', 'border-0', 'rounded-0');
  }
  const currentPost = filterData(posts, prevPosts);
  update(currentPost, i18nInstance);
};
