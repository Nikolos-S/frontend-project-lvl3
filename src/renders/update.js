export default (posts, i18Vewing) => {
  const ulEl = document.querySelector('ul');
  ulEl.innerHTML = '';
  posts.forEach((post) => {
    const liEl = document.createElement('li');
    const aEl = document.createElement('a');
    const buttonEl = document.createElement('button');
    const divHref = document.createElement('div');
    const divButton = document.createElement('div');
    const divContainer = document.createElement('div');
    divContainer.classList.add('row');
    divHref.classList.add('col-10');
    divButton.classList.add('col-2');
    aEl.classList.add('fw-bold');
    buttonEl.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0');
    aEl.setAttribute('href', post.link);
    aEl.setAttribute('target', '_blank');
    buttonEl.setAttribute('data-toggle', 'modal');
    aEl.textContent = post.title;
    buttonEl.textContent = i18Vewing;
    liEl.append(divContainer);
    divContainer.append(divHref);
    divContainer.append(divButton);
    divButton.append(buttonEl);
    divHref.append(aEl);
    ulEl.append(liEl);
  });
};
