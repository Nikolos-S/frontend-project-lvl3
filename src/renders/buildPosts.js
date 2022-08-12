import update from './update.js';

export default (posts, i18Posts, i18Vewing) => {
  const container = document.querySelector('.posts');
  container.innerHTML = `<div><div><h2>${i18Posts}</h2></div><ul></ul></div>`;
  const divBorder = container.querySelector('div');
  divBorder.classList.add('card', 'border-0');
  const divBody = divBorder.querySelector('div');
  divBody.classList.add('card-body');
  container.querySelector('h2').classList.add('card-title', 'h4');
  const ulEl = container.querySelector('ul');
  ulEl.classList.add('list-group', 'border-0', 'rounded-0');
  update(posts, i18Vewing);
};
