import axios from 'axios';

const getNetworkRequest = (url) => {
  const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlWithProxy.searchParams.set('disableCache', 'true');
  urlWithProxy.searchParams.set('url', url);
  const document = axios.get(urlWithProxy)
    .then((response) => response.data)
    .catch(() => {
      throw new Error('netErr');
    });
  return document;
};

export default getNetworkRequest;
