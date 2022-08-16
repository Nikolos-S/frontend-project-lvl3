export default (value) => {
  const input = document.querySelector('input[name="url"]');
  input.value = '';
  input.focus();
  const parent = input.closest('.text-white');
  const pEl = document.createElement('p');
  pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small');
  input.classList.remove('is-invalid');
  pEl.classList.add('text-success');
  pEl.textContent = value;
  parent.replaceChild(pEl, parent.querySelector('.feedback'));
};
