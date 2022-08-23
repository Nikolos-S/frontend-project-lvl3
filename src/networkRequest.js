import axios from 'axios';
import parserData from './parser.js';

const getNetworkRequest = (url, netErr) => {
  const newUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
  const document = axios.get(newUrl)
    .then((response) => response.data)
    .catch(() => {
      throw new Error(netErr);
    })
    .then((data) => parserData(url, data));
  return document;
};

export default getNetworkRequest;
