/* eslint-disable consistent-return */
const signupForm = document.querySelector('#signup-form');
const emailField = document.querySelector('input[name="email"]');
const passwordField = document.querySelector('input[name="password"]');
const confirmPasswordField = document.querySelector('input[name="confirm-password"]');


// functions
function signup(e) {
  e.preventDefault();
  if (passwordField.value !== confirmPasswordField.value) {
    return alert('Password do not match');
  }
  const credentials = {
    email: emailField.value,
    password: passwordField.value,
  };
  fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(res => res.json())
    .then((res) => {
      if (!res.token) {
        alert(res.message);
      } else {
        localStorage.setItem('userToken', res.token);
        window.location.href = '/dashboard.html';
        // console.log(res);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// adding event listeners
signupForm.addEventListener('submit', signup);
