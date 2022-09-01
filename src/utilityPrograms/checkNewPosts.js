import getNetworkRequest from './networkRequest.js';
import parse from './parse.js';

const checkNewPosts = (url, prevPosts) => {
  const newPosts = getNetworkRequest(url).then((promise) => {
    const [, postsData] = parse(url, promise);
    return postsData;
  })
    .then((promise) => promise.filter((post) => prevPosts
      .findIndex((prevPost) => prevPost.title === post.title) === -1));
  return newPosts;
};

export default checkNewPosts;
