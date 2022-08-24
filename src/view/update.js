const updatePosts = (posts, i18nInstance) => {
  const ulEl = document.querySelector('ul');
  posts.forEach((post) => {
    const liEl = document.createElement('li');
    const aEl = document.createElement('a');
    const buttonEl = document.createElement('button');
    aEl.classList.add('fw-bold');
    buttonEl.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0', 'd-flex', 'justify-content-between', 'align-items-start');
    aEl.setAttribute('href', post.link);
    aEl.setAttribute('target', '_blank');
    aEl.setAttribute('data-id', post.id);
    buttonEl.dataset.bsToggle = 'modal';
    buttonEl.dataset.bsTarget = '#modal';
    buttonEl.dataset.id = post.id;
    aEl.textContent = post.title;
    buttonEl.textContent = i18nInstance.t('vewing');
    liEl.append(aEl);
    liEl.append(buttonEl);
    ulEl.append(liEl);
  });
};

export default updatePosts;
