// import uniqueId from 'lodash/uniqueId.js';

export default (document) => {
  const title = document.querySelector('title').textContent;
  const description = document.querySelector('description').textContent;
  // const idFeed = uniqueId();
  const feedData = {
    // id: idFeed,
    titleFeed: title,
    descriptionFeed: description,
  };
  return feedData;
};
