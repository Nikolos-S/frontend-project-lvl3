export default (id) => {
  const useHref = document.querySelectorAll('a[data-id]');
  useHref.forEach((href) => {
    if (id.includes(href.dataset.id)) {
      href.classList.remove('fw-bold');
      href.classList.add('fw-normal');
    }
  });
};
