export default (proxyPost, elements) => {
  const title = elements.modalWindow.querySelector('h5');
  const description = elements.modalWindow.querySelector('.modal-body');
  const activePost = JSON.parse(JSON.stringify(proxyPost))[0];
  title.textContent = activePost.title;
  description.textContent = activePost.description;
  const aEl = elements.modalWindow.querySelector('a');
  aEl.setAttribute('href', activePost.link);
};
