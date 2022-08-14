import uniqueId from 'lodash/uniqueId.js';

export default (feeds, url) => {
  const indexUrl = feeds.findIndex((el) => el.urlFeed === url);
  const idFeed = (indexUrl === -1) ? uniqueId() : indexUrl + 1;
  return idFeed;
};
