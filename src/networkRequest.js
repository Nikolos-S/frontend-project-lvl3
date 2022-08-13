import axios from 'axios';

export default (url) => {
  const newUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
  return axios.get(newUrl);
};
