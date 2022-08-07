export default (error) => {
  const input = document.querySelector('input[name="url"]');
  input.value = '';
  input.focus();
  const parent = input.closest('.text-white');
  const pEl = document.createElement('p');
  pEl.classList.add('feedback', 'm-0', 'position-absolute', 'small');
  input.classList.add('is-invalid');
  pEl.classList.add('text-danger');
  pEl.textContent = error.message;
  parent.replaceChild(pEl, parent.querySelector('.feedback'));
};
