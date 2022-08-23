const parserData = (url, document) => {
  try {
    const parser = new DOMParser();
    const domRss = parser.parseFromString(document.contents, 'text/xml');
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
  } catch (e) {
    return e;
  }
};

export default parserData;
