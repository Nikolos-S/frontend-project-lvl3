export default (posts, lng) => {
  const container = document.querySelector('.posts');
  container.innerHTML = `<div><div><h2>${lng}</h2></div><ul></ul></div>`;
  const divBorder = container.querySelector('div');
  divBorder.classList.add('card', 'border-0');
  const divBody = divBorder.querySelector('div');
  divBody.classList.add('card-body');
  container.querySelector('h2').classList.add('card-title', 'h4');
  const ulEl = container.querySelector('ul');
  ulEl.classList.add('list-group', 'border-0', 'rounded-0');
  posts.forEach((post) => {
    const liEl = document.createElement('li');
    const aEl = document.createElement('a');
    aEl.setAttribute('href', post.link);
    aEl.setAttribute('target', '_blank');
    aEl.textContent = post.title;
    liEl.append(aEl);
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0');
    ulEl.append(liEl);
  });
};
