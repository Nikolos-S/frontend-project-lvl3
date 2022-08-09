export default (document) => {
  const items = new Array(...document.querySelectorAll('item'));
  const postsData = items.reduce((acc, item) => {
    const titlePost = item.querySelector('title').textContent;
    const linkPost = item.querySelector('link').textContent;
    const descriptionPost = item.querySelector('description').textContent;
    return [...acc, {
      // feedId: idFeed,
      title: titlePost,
      link: linkPost,
      description: descriptionPost,
    }];
  }, []);
  return postsData;
};
