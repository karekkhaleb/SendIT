const signinForm = document.querySelector('#signin-form');
const emailField = document.querySelector('input[name="email"]');
const passwordField = document.querySelector('input[name="password"]');

// functions
function login(e) {
  e.preventDefault();
  const credentials = {
    email: emailField.value,
    password: passwordField.value,
  };
  fetch('/api/v1/auth/signin', {
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
signinForm.addEventListener('submit', login);
