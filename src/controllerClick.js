export default (state, elements, watchedState) => {
  elements.containerPosts.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    watchedState.viewedLinkIds.add(id);
    if (e.target.type === 'submit') {
      const post = state.data.posts.filter((el) => el.id === id);
      watchedState.currentPost = post;
    }
  });
};
