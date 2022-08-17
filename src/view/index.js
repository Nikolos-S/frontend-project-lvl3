import renderVAlid from './renderValid.js';
import renderNoValid from './renderNoValid.js';
import buildPosts from './buildPosts.js';
import renderUse from './renderUse.js';
import renderModal from './renderModal.js';
import renderLoading from './renderLoading.js';

const render = (state, path, currentValue, prevValue, elements) => {
  switch (path) {
    case 'loading':
      return renderLoading(currentValue, elements);
    case 'data.feeds':
      return renderVAlid(currentValue, state.lng, elements);
    case 'data.posts':
      return buildPosts(currentValue, prevValue, state.lng, elements);
    case 'error':
      return renderNoValid(currentValue, state.lng, elements);
    case 'useId':
      return renderUse(currentValue);
    case 'currentPost':
      return renderModal(currentValue, elements);
    default:
      return null;
  }
};

export default render;
