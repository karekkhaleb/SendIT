const closeEditOrderBtn = document.getElementById('close-edit-order-form-btn');
const editOrderBackground = document.querySelectorAll('.edit-order-bg')[0];
const orderList = document.querySelectorAll('.orders-list li');


// Adding event listener
/**
 * opening the form for the admin to edit the Order
 */
orderList.forEach((li)=>{
    li.addEventListener('click', () => {
        editOrderBackground.style.display = 'block';
    })
});
/**
 * closing the admin form to edit the order
 */
closeEditOrderBtn.addEventListener('click', () =>{
    editOrderBackground.style.display = 'none';

});