const logoutBtns = document.querySelectorAll('.logout');

function logout(e) {
  e.preventDefault();
  localStorage.removeItem('userToken');
  window.location.href = '/index.html';
}

logoutBtns.forEach((btn) => {
  btn.addEventListener('click', logout);
});

