export default (id) => {
  const useHref = new Array(...document.querySelectorAll('a[data-id]'));
  useHref.filter((link) => id.has(link.dataset.id))
    .forEach((href) => {
      href.classList.remove('fw-bold');
      href.classList.add('fw-normal');
    });
};
