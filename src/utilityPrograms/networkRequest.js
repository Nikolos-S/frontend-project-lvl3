import axios from 'axios';
import parserData from './parser.js';

const getNetworkRequest = (url, i18nInstance) => {
  const newUrl = new URL('https://allorigins.hexlet.app/get?disableCache=true&url');
  newUrl.search = `disableCache=true&url=${encodeURIComponent(url)}`;
  const document = axios.get(newUrl)
    .then((response) => response.data)
    .catch(() => {
      throw new Error(i18nInstance.t('netErr'));
    })
    .then((data) => parserData(url, data, i18nInstance));
  return document;
};

export default getNetworkRequest;
