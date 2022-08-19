import buildFeed from './buildFeed.js';
import buildPosts from './buildPosts.js';
import renderUse from './renderUse.js';
import renderModal from './renderModal.js';
import handleProcessState from './handleProcessState.js';

const render = (state, path, currentValue, prevValue, elements) => {
  switch (path) {
    case 'processState':
      return handleProcessState(currentValue, elements, state);
    case 'data.feeds':
      return buildFeed(currentValue, state.lng, elements);
    case 'data.posts':
      return buildPosts(currentValue, prevValue, state.lng, elements);
    case 'useId':
      return renderUse(currentValue);
    case 'currentPost':
      return renderModal(currentValue, elements);
    default:
      return null;
  }
};

export default render;
