export default (post, elements) => {
  const title = elements.modalWindow.querySelector('h5');
  const description = elements.modalWindow.querySelector('.modal-body');
  const activePost = post[0];
  title.textContent = activePost.title;
  description.textContent = activePost.description;
  const aEl = elements.modalWindow.querySelector('a');
  aEl.setAttribute('href', activePost.link);
  console.log(post);
};
