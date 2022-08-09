const parserData = (url) => {
  const dataParse = fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
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
