const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

if (formData) {
  refs.email.value = formData.email || '';
  refs.message.value = formData.message || '';
}

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (refs.email.value.trim() === '' || refs.message.value.trim() === '')
    return alert('All fields must be filled');
  console.log(formData);
  e.currentTarget.reset();
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
}
