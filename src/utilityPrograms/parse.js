import uniqueId from 'lodash/uniqueId.js';

const parse = (url, document) => {
  const parser = new DOMParser();
  const domRss = parser.parseFromString(document.contents, 'text/xml');
  if (domRss.querySelector('parsererror')) {
    throw new Error('noValid');
  }
  const title = domRss.querySelector('title').textContent;
  const description = domRss.querySelector('description').textContent;
  const feedData = {
    urlFeed: url,
    titleFeed: title,
    descriptionFeed: description,
  };
  const items = new Array(...domRss.querySelectorAll('item'));
  const postsData = items.reduce((acc, item) => {
    const titlePost = item.querySelector('title').textContent;
    const linkPost = item.querySelector('link').textContent;
    const descriptionPost = item.querySelector('description').textContent;
    return [...acc, {
      id: uniqueId(),
      title: titlePost,
      link: linkPost,
      description: descriptionPost,
    }];
  }, []);
  return [feedData, postsData];
};

export default parse;
