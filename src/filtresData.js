export default (currentPost, posts) => currentPost
  .filter((element) => posts
    .findIndex((el) => el.title === element.title) === -1);
