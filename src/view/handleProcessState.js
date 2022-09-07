const handleProcessState = (processState, i18nInstance, elements, error) => {
  const parent = elements.input.closest('.text-white');
  const pEl = document.createElement('p');
  pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small');
  switch (processState) {
    case 'sending':
      elements.input.classList.remove('is-invalid');
      pEl.classList.add('text-info');
      pEl.textContent = i18nInstance.t('loading');
      break;
    case 'sent':
      elements.input.value = '';
      elements.input.focus();
      elements.block.submit.disabled = false;
      elements.input.classList.remove('is-invalid');
      pEl.classList.add('text-success');
      pEl.textContent = i18nInstance.t('success');
      break;
    case 'error':
      elements.input.focus();
      elements.block.submit.disabled = false;
      elements.input.classList.add('is-invalid');
      pEl.classList.add('text-danger');
      pEl.textContent = i18nInstance.t(error);
      break;
    default:
      throw new Error('Something went wrong');
  }
  parent.replaceChild(pEl, parent.querySelector('.feedback'));
};

export default handleProcessState;
