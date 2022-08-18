import i18nInstance from '../locales/interpreter.js';

export default (error, lng, elements) => {
  elements.block.submit.disabled = false;
  elements.input.value = '';
  elements.input.focus();
  const parent = elements.input.closest('.text-white');
  const pEl = document.createElement('p');
  pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small');
  elements.input.classList.add('is-invalid');
  pEl.classList.add('text-danger');
  pEl.textContent = (error.message !== 'Cannot read properties of null (reading \'textContent\')') ? error.message : i18nInstance(lng, 'noValid');
  parent.replaceChild(pEl, parent.querySelector('.feedback'));
};
