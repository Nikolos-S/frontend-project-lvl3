export default () => {
  const divLanguage = document.querySelector('#language');
  const activButton = divLanguage.querySelector('.btn-primary');
  const newActivButton = divLanguage.querySelector('.btn-outline-primary');
  activButton.classList.toggle('btn-primary');
  activButton.classList.toggle('btn-outline-primary');
  newActivButton.classList.toggle('btn-primary');
  newActivButton.classList.toggle('btn-outline-primary');
};
