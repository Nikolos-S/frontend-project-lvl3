export default (proxyPost) => {
  const modalWindow = document.querySelector('#modal');
  modalWindow.classList.add('show');
  modalWindow.setAttribute('style', 'display:block');
  const title = modalWindow.querySelector('h5');
  const description = modalWindow.querySelector('.modal-body');
  const post = JSON.parse(JSON.stringify(proxyPost));
  const activePost = post[0];
  title.textContent = activePost.title;
  description.textContent = activePost.description;
  const aEl = modalWindow.querySelector('a');
  aEl.setAttribute('href', activePost.link);
  const closeButtons = modalWindow.querySelectorAll('button');
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
      modalWindow.classList.remove('show');
      modalWindow.setAttribute('style', 'display:none');
    });
  });
};
