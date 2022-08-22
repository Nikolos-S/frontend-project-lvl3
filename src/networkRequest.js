import axios from 'axios';

export default (url, netErr) => {
  const newUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
  return axios.get(newUrl)
    .then((response) => response.data)
    .catch(() => {
      throw new Error(netErr);
    });
};
