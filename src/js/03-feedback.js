const throttle = require('lodash.throttle');

const STORAGE_KEY_MSG = 'feedback-message';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextAreaInput, 500));

getTextArea();

function onFeedbackFormSubmit(evt) {
  evt.preventDefaul();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY_MSG);
}

function onTextAreaInput(evt) {
  const message = evt.target.value;
  localStorage.setItem(STORAGE_KEY_MSG, message);
}

function getTextArea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY_MSG);

  if (savedMessage) {
    refs.textarea.value = savedMessage;
  }
}
