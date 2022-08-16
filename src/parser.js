import networkRequest from './networkRequest.js';

const buildNormalizedData = (document, url) => {
  const title = document.querySelector('title').textContent;
  const description = document.querySelector('description').textContent;
  const feedData = {
    urlFeed: url,
    titleFeed: title,
    descriptionFeed: description,
  };
  const items = new Array(...document.querySelectorAll('item'));
  const postsData = items.reduce((acc, item) => {
    const titlePost = item.querySelector('title').textContent;
    const linkPost = item.querySelector('link').textContent;
    const descriptionPost = item.querySelector('description').textContent;
    return [...acc, {
      title: titlePost,
      link: linkPost,
      description: descriptionPost,
    }];
  }, []);
  return [feedData, postsData];
};

const parserData = (url) => {
  const document = networkRequest(url)
    .then((response) => response.data)
    .catch(() => {
      throw new Error('Network response was not ok.');
    })
    .then((data) => {
      const parser = new DOMParser();
      const domRss = parser.parseFromString(data.contents, 'text/xml');
      return buildNormalizedData(domRss, url);
    });
  return document;
};

export default parserData;