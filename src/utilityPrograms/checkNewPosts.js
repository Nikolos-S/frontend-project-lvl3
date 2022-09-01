import getNetworkRequest from './networkRequest.js';
import parse from './parse.js';

const checkNewPosts = (url, prevPosts, i18nInstance) => {
  const newPosts = getNetworkRequest(url, i18nInstance).then((promise) => {
    const [, postsData] = parse(url, promise);
    return postsData;
  })
    .then((promise) => promise.filter((post) => prevPosts
      .findIndex((prevPost) => prevPost.title === post.title) === -1));
  return newPosts;
};

export default checkNewPosts;
