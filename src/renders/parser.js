import axios from 'axios';

const parserData = (url) => {
  const newUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
  const dataParse = axios.get(newUrl)
    .then((response) => response.data)
    .catch(() => {
      throw new Error('Network response was not ok.');
    })
    .then((data) => {
      const parser = new DOMParser();
      const domRss = parser.parseFromString(data.contents, 'text/xml');
      return domRss;
    });
  return dataParse;
};

export default parserData;
