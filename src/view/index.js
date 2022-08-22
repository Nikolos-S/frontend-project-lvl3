import onChange from 'on-change';
import buildFeed from './buildFeed.js';
import buildPosts from './buildPosts.js';
import renderUse from './renderUse.js';
import renderModal from './renderModal.js';
import handleProcessState from './handleProcessState.js';

const watch = (state, elements) => {
  const render = onChange(state, (path, currentValue, prevValue) => {
    switch (path) {
      case 'processState':
        return handleProcessState(currentValue, elements, state);
      case 'data.feeds':
        return buildFeed(currentValue, state.lng, elements);
      case 'data.posts':
        return buildPosts(currentValue, prevValue, state.lng, elements);
      case 'viewedLinkIds':
        return renderUse(currentValue);
      case 'currentPost':
        return renderModal(currentValue, elements);
      default:
        return null;
    }
  });
  return render;
};

export default watch;
