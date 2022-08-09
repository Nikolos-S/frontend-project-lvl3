// import parserData from './parser.js';
// import normalizData from './normalizData.js';

export default (currentPosts, posts) => currentPosts
  .filter((element) => posts.findIndex((el) => el.title === element.title) === -1);
