const openEditOrderBtn = document.querySelectorAll('.edit-order')[0];
// const closeEditOrderBtn = document.getElementById('edit-order-bg')
const closeEditOrderBtn = document.getElementById('close-edit-order-form-btn');
const editOrderBackground = document.querySelectorAll('.edit-order-bg')[0];

openEditOrderBtn.addEventListener('click', (e) => {
    editOrderBackground.style.display = 'block';
    // window.location.href = '/edit-order.html';
});
closeEditOrderBtn.addEventListener('click', () => {
    editOrderBackground.style.display = 'none';
});