const getNewPosts = (newPost, prevPosts) => newPost
  .filter((element) => prevPosts
    .findIndex((el) => el.title === element.title) === -1);

const buildPosts = (newPosts, prevPosts, i18nInstance, elements) => {
  const container = elements.containerPosts;
  if (!container.querySelector('ul')) {
    const postContainer = document.createElement('div');
    const littleDiv = document.createElement('div');
    const titlePost = document.createElement('h2');
    const ulList = document.createElement('ul');
    postContainer.classList.add('card', 'border-0');
    littleDiv.classList.add('card-body');
    titlePost.classList.add('card-title', 'h4');
    ulList.classList.add('list-group', 'border-0', 'rounded-0');
    titlePost.textContent = `${i18nInstance.t('posts')}`;
    littleDiv.append(titlePost);
    postContainer.append(littleDiv);
    postContainer.append(ulList);
    container.append(postContainer);
  }
  const ulEl = container.querySelector('ul');
  const currentPost = getNewPosts(newPosts, prevPosts);
  currentPost.forEach((post) => {
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

export default buildPosts;
