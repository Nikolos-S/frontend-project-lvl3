export default (proxyPost) => {
  const modalWindow = document.querySelector('#modal');
  const title = modalWindow.querySelector('h5');
  const description = modalWindow.querySelector('.modal-body');
  const post = JSON.parse(JSON.stringify(proxyPost));
  const activePost = post[0];
  title.textContent = activePost.title;
  description.textContent = activePost.description;
  const aEl = modalWindow.querySelector('a');
  aEl.setAttribute('href', activePost.link);
};
