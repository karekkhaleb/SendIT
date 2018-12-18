function checkToken() {
  if (localStorage.getItem('userToken')) {
    // localStorage.removeItem('userToken');
    window.location.href = '/dashboard.html';
  }
}

checkToken();
