const userActionsUl = document.querySelector('#user-actions');
function checkAuth() {
  if (localStorage.getItem('userToken')) {
    userActionsUl.innerHTML = `
      <li><a href="/dashboard.html">Dashboard</a></li>
      <li><a class="logout" href="login.html">Logout</a></li>
  `;
  }
}
checkAuth();
