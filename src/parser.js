import networkRequest from './networkRequest.js';

const parserData = (url, netErr) => {
  const document = networkRequest(url, netErr)
    .then((data) => {
      const parser = new DOMParser();
      const domRss = parser.parseFromString(data.contents, 'text/xml');
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
          title: titlePost,
          link: linkPost,
          description: descriptionPost,
        }];
      }, []);
      return [feedData, postsData];
    });
  return document;
};

export default parserData;
