import renderVAlid from './renderValid.js';
import renderNoValid from './renderNoValid.js';
import buildPosts from '../buildPosts.js';
import renderUse from './renderUse.js';
import renderModal from './renderModal.js';

const render = (state, path, currentValue, prevValue) => {
  switch (path) {
    case 'data.feeds':
      return renderVAlid(currentValue, state.lng);
    case 'data.posts':
      return buildPosts(currentValue, prevValue, state.lng);
    case 'error':
      return renderNoValid(currentValue, state.lng);
    case 'useId':
      return renderUse(currentValue);
    case 'currentPost':
      return renderModal(currentValue);
    default:
      return null;
  }
};

export default render;
