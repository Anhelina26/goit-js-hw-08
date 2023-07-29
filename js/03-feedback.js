import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');



const saveStateToLocalStorage = throttle(function () {
  const state = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem("feedback-form-state", JSON.stringify(state));
}, 500);


form.addEventListener('input', function () {
  saveStateToLocalStorage();
});


function loadSavedState() {
  const savedState = localStorage.getItem("feedback-form-state");
  if (savedState) {
    const state = JSON.parse(savedState);
    emailInput.value = state.email;
    messageTextarea.value = state.message;
  }
}

loadSavedState();


form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const state = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  console.log('Form data submitted:', state);

  localStorage.removeItem("feedback-form-state");
  emailInput.value = '';
  messageTextarea.value = '';

  console.log('Form submitted and fields cleared.');
}