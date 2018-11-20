window.onload = () =>{
    const btns = document.querySelectorAll('.js-add-order');
    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            window.location.href = "/create-order.html";
            // alert('added the order');
        });
    });
};
