import onChange from 'on-change';
import buildFeed from './buildFeed.js';
import buildPosts from './buildPosts.js';
import renderUse from './renderUse.js';
import renderModal from './renderModal.js';
import handleProcessState from './handleProcessState.js';

const watch = (state, elements, i18nInstance) => {
  const render = onChange(state, (path, currentValue, prevValue) => {
    switch (path) {
      case 'processState':
        return handleProcessState(currentValue, i18nInstance, elements, state.error);
      case 'data.feeds':
        return buildFeed(currentValue, i18nInstance, elements);
      case 'data.posts':
        return buildPosts(currentValue, prevValue, i18nInstance, elements);
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
