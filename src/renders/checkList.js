import parserData from './parser.js';
import normalizData from './normalizDataPost';

const checkList = (urls, posts) => {
  const parseUrls = urls.map((url) => parserData(url))
    .reduce((acc, document) => [...acc, document.then((promise) => normalizData(promise)
      .filter((element) => posts
        .findIndex((el) => el.title === element.title) === -1))], []);
  return parseUrls;
};

export default checkList;
/*
.reduce((acc, document) => [...acc, document.then((promise) => normalizData(promise)
        .filter((element) => posts
          .findIndex((el) => el.title === element.title) === -1))], []);
*/
