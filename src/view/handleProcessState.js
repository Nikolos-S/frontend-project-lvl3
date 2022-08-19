import i18nInstance from '../locales/interpreter.js';

export default (processState, elements, state) => {
  const parent = elements.input.closest('.text-white');
  const pEl = document.createElement('p');
  pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small');
  if (processState === 'sending') {
    elements.input.classList.remove('is-invalid');
    pEl.classList.add('text-info');
    pEl.textContent = i18nInstance(state.lng, 'loading');
  } else if (processState === 'sent') {
    elements.input.value = '';
    elements.input.focus();
    elements.block.submit.disabled = false;
    elements.input.classList.remove('is-invalid');
    pEl.classList.add('text-success');
    pEl.textContent = i18nInstance(state.lng, 'success');
  } else if (processState === 'error') {
    elements.input.value = '';
    elements.input.focus();
    elements.block.submit.disabled = false;
    elements.input.classList.add('is-invalid');
    pEl.classList.add('text-danger');
    pEl.textContent = (state.error.message !== 'Cannot read properties of null (reading \'textContent\')') ? state.error.message : i18nInstance(state.lng, 'noValid');
  }
  parent.replaceChild(pEl, parent.querySelector('.feedback'));
};
