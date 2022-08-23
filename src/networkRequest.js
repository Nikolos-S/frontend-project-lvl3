import axios from 'axios';
import i18nInstance from './locales/interpreter.js';
import parserData from './parser.js';

const getNetworkRequest = (url, lng) => {
  const newUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
  const document = axios.get(newUrl)
    .then((response) => response.data)
    .catch(() => {
      throw new Error(i18nInstance(lng, 'netErr'));
    })
    .then((data) => parserData(url, data, lng));
  return document;
};

export default getNetworkRequest;
