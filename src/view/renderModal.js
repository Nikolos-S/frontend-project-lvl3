export default (post, elements) => {
  const title = elements.modalWindow.querySelector('h5');
  const description = elements.modalWindow.querySelector('.modal-body');
  title.textContent = post.title;
  description.textContent = post.description;
  const aEl = elements.modalWindow.querySelector('a');
  aEl.setAttribute('href', post.link);
};
