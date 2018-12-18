// const openEditOrderBtns = document.querySelectorAll('.edit-order');
const closeEditOrderBtn = document.getElementById('close-edit-order-form-btn');
const editOrderBackground = document.querySelectorAll('.edit-order-bg')[0];
const body = document.querySelector('body');

const parcelsTable = document.querySelector('#parcels-table');
// eslint-disable-next-line no-undef
const user = jwt_decode(localStorage.getItem('userToken')).data;

// openEditOrderBtns.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     editOrderBackground.style.display = 'block';
//   });
// });

closeEditOrderBtn.addEventListener('click', () => {
  editOrderBackground.style.display = 'none';
});
body.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-order')) {
    editOrderBackground.style.display = 'block';
  }
});


function fetchParcels() {
  fetch(`/api/v1/users/${user.id}/parcels`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `bearer ${localStorage.getItem('userToken')}`,
    },
  }).then(res => res.json())
    .then((res) => {
      const { parcels } = res;
      parcels.forEach((parcel) => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
          <td>${parcel.description}</td>
          <td>${parcel.weight}</td>
          <td>${parcel.pickup_location}</td>
          <td>${parcel.current_location}</td>
          <td>${parcel.destination}</td>
          <td>${parcel.price}</td>
          <td>${parcel.status}</td>
          <td><i parcel-id="${parcel.id}" class="edit-order fas fa-edit"></i></td>
        `;
        parcelsTable.appendChild(tableRow);
      });
    });
}
fetchParcels();
