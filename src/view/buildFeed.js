export default (feeds, i18nInstance, elements) => {
  const container = elements.containerFeeds;
  container.innerHTML = `<div><div><h2>${i18nInstance.t('feeds')}</h2></div><ul></ul></div>`;
  const listFeed = feeds.reduce((acc, feed) => `${acc}<li><h3>${feed.titleFeed}</h3><p>${feed.descriptionFeed}</p></li>`, '');
  container.querySelector('ul').innerHTML = listFeed;
  const divBorder = container.querySelector('div');
  divBorder.classList.add('card', 'border-0');
  const divBody = divBorder.querySelector('div');
  divBody.classList.add('card-body');
  container.querySelector('h2').classList.add('card-title', 'h4');
  container.querySelector('ul').classList.add('list-group', 'border-0', 'rounded-0');
  container.querySelectorAll('li').forEach((liEl) => liEl.classList.add('list-group-item', 'border-0', 'border-end-0'));
  container.querySelectorAll('h3').forEach((hEl) => hEl.classList.add('h6', 'm-0'));
  container.querySelectorAll('p').forEach((pEl) => pEl.classList.add('m-0', 'small', 'text-black-50'));
};
