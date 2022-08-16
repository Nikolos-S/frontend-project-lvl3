export default (state) => {
  const container = document.querySelector('.posts');
  container.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    state.useId.push(id);
    if (e.target.type === 'submit') {
      const post = state.data.posts.filter((el) => el.id === id);
      state.currentPost = post;
    }
  });
};
