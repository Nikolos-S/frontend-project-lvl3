const buildFeed = (feeds, i18nInstance, elements) => {
  const container = elements.containerFeeds;
  container.innerHTML = '';
  const feedContainer = document.createElement('div');
  const littleDiv = document.createElement('div');
  const titleFeed = document.createElement('h2');
  const ulList = document.createElement('ul');
  feedContainer.classList.add('card', 'border-0');
  littleDiv.classList.add('card-body');
  ulList.classList.add('list-group', 'border-0', 'rounded-0');
  titleFeed.classList.add('card-title', 'h4');
  titleFeed.textContent = `${i18nInstance.t('feeds')}`;
  littleDiv.append(titleFeed);
  feedContainer.append(littleDiv);
  feedContainer.append(ulList);
  container.append(feedContainer);
  feeds.forEach((feed) => {
    const list = document.createElement('li');
    const titleList = document.createElement('h3');
    const description = document.createElement('p');
    list.classList.add('list-group-item', 'border-0', 'border-end-0');
    titleList.classList.add('h6', 'm-0');
    description.classList.add('m-0', 'small', 'text-black-50');
    titleList.textContent = `${feed.titleFeed}`;
    description.textContent = `${feed.descriptionFeed}`;
    list.append(titleList);
    list.append(description);
    ulList.append(list);
  });
};

export default buildFeed;
