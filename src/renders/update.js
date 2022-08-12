export default (posts) => {
  const ulEl = document.querySelector('ul');
  ulEl.innerHTML = '';
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
