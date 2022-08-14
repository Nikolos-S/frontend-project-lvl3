import renderVAlid from './renderValid.js';
import renderNoValid from './renderNoValid.js';
import buildPosts from '../buildPosts.js';

const render = (lng) => (path, currentValid) => {
  switch (path) {
    case 'data.feeds':
      return renderVAlid(currentValid, lng);
    case 'data.posts':
      return buildPosts(currentValid, lng);
    case 'error':
      return renderNoValid(currentValid, lng);
    default:
      return null;
  }
};

export default render;
