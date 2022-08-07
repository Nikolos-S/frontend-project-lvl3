import uniqueId from 'lodash/uniqueId.js';

const buildFeed = (document) => {
  const title = document.querySelector('title').textContent;
  const description = document.querySelector('description').textContent;
  const idFeed = uniqueId();
  const feedData = {
    id: idFeed,
    titleFeed: title,
    descriptionFeed: description,
  };
  const items = new Array(...document.querySelectorAll('item'));
  const postsData = items.reduce((acc, item) => {
    const titlePost = item.querySelector('title').textContent;
    const linkPost = item.querySelector('link').textContent;
    const descriptionPost = item.querySelector('description').textContent;
    return [...acc, {
      feedId: idFeed,
      title: titlePost,
      link: linkPost,
      description: descriptionPost,
    }];
  }, []);
  return [feedData, postsData];
};

export default (state) => {
  const url = state.registrationForm.currentURL;
  const dataParse = fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then((data) => {
      const parser = new DOMParser();
      const domRss = parser.parseFromString(data.contents, 'text/xml');
      return buildFeed(domRss);
    });
  return dataParse;
};
