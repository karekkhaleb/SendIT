class Parcel {
  constructor({
    parcelId,
    userId,
    weight,
    pickupLocation,
    destination,
    description,
    delivered,
    price,
  }) {
    this.parcelId = parcelId;
    this.userId = userId;
    this.weight = weight;
    this.pickupLocation = pickupLocation;
    this.currentLocation = pickupLocation;
    this.destination = destination;
    this.description = description;
    this.delivered = delivered;
    this.price = price;
  }
}


const Parcels = [];

function createNewParcel({
  userId, weight, pickupLocation, destination, description,
}) {
  const price = weight * 12; // 12 is the price of 1kg in USD
  if (!Parcels.length) {
    const newParcel = new Parcel({
      userId,
      weight,
      pickupLocation,
      destination,
      description,
      price,
      parcelId: 1,
      delivered: false,
    });
    Parcels.push(newParcel);
    return newParcel;
  }
  const parcelId = Parcels[Parcels.length - 1].parcelId + 1;
  const newParcel = new Parcel({
    parcelId, userId, weight, pickupLocation, destination, description, price,
  });
  Parcels.push(newParcel);
  return newParcel;
}


function getParcelById(parcelId) {
// eslint-disable-next-line no-restricted-syntax
  for (const parcel of Parcels) {
    if (parcel.parcelId === parcelId) {
      return parcel;
    }
  }
  return null;
}

function getParcelsByUserId(userId) {
  const parcelsForOneUser = [];
  Parcels.forEach((parcel) => {
    if (parcel.userId === userId) {
      parcelsForOneUser.push(parcel);
    }
  });
  if (parcelsForOneUser.length) return parcelsForOneUser;
  return [];
}

function removeParcelById(parcelId) {
  let parcelIndex = 0;
  let tempParcel = null;
  // eslint-disable-next-line no-restricted-syntax
  for (const parcel of Parcels) {
    if (parcel.parcelId === parcelId) {
      tempParcel = parcel;
      break;
    }
    parcelIndex += 1;
  }
  if (tempParcel) {
    Parcels.splice(parcelIndex, 1);
    return tempParcel;
  }
  return null;
}


createNewParcel({
  userId: 1,
  weight: 87,
  pickupLocation: 'kigali',
  destination: 'musanze',
  description: 'TV set',
});
createNewParcel({
  userId: 1,
  weight: 14,
  pickupLocation: 'gisozi',
  destination: 'nyabugogo',
  description: 'IphoneX',
});
console.log('*******************', Parcels, '*********************');
console.log(removeParcelById(85));
console.log('*******************', Parcels, '*********************');
console.log(removeParcelById(2));
console.log('*******************', Parcels, '*********************');

export default Parcels;
export {
  removeParcelById,
  createNewParcel,
  getParcelsByUserId,
  getParcelById,
};


/**

class ParcelsCollection extends Array {
  createNewParcel = (
    userId,
    weight,
    pickupLocation,
    destination,
    description,
    price,
  ) => {
    let parcelId;
    if (this.length <= 0) {
      parcelId = 1;
    } else {
      parcelId = this[this.length - 1].parcelId + 1;
    }
    const newParcel = new Parcel({
      parcelId,
      userId,
      weight,
      pickupLocation,
      destination,
      description,
      price,
      delivered: false,
    });

    if (
      !newParcel.userId
      || !newParcel.pickupLocation
      || !newParcel.parcelId
      || !newParcel.weight
      || !newParcel.currentLocation
      || !newParcel.description
      || !newParcel.destination
      || !newParcel.price
    ) {
      return null;
    }
    this.push(newParcel);
    return { ...newParcel };
  };

  getParcelById = (parcelId) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, value] of this.entries()) {
      if (value.parcelId === parcelId) {
        return {
          index,
          parcel: { ...value },
        };
      }
    }
    return null;
  };

  getParcelsByUserId = (userId) => {
    const parcelsForOneUser = [];
    this.forEach((parcel) => {
      if (parcel.userId === userId) {
        parcelsForOneUser.push(parcel);
      }
    });

    if (parcelsForOneUser.length) return parcelsForOneUser;
    return null;
  };

  editParcelDestinationById = (parcelId, destination) => {
    const parcelObj = this.getParcelById(parcelId);
    if (!parcelObj) return null;

    const editedParcel = new Parcel({ ...parcelObj.parcel, destination });
    const prevThis = [...this];
    let editedThis = [];
    this.length = 0;

    editedThis = [
      ...prevThis.slice(0, parcelObj.index),
      editedParcel,
      ...prevThis.slice(parcelObj.index + 1),
    ];

    editedThis.forEach((parcel) => {
      this.push(parcel);
    });
    return editedParcel;
  };

  editParcelCurrentLocationById = (parcelId, currentLocation) => {
    const parcelObj = this.getParcelById(parcelId);
    if (!parcelObj) return null;

    const editedParcel = new Parcel({ ...parcelObj.parcel, currentLocation });
    const prevThis = [...this];
    let editedThis = [];
    this.length = 0;

    editedThis = [
      ...prevThis.slice(0, parcelObj.index),
      editedParcel,
      ...prevThis.slice(parcelObj.index + 1),
    ];

    editedThis.forEach((parcel) => {
      this.push(parcel);
    });

    return editedParcel;
  };

  editParcelStatusById = (parcelId, { ...status }) => {
    const parcelObj = this.getParcelById(parcelId);
    if (!parcelObj) return null;

    const editedParcel = new Parcel({ ...parcelObj.parcel, ...status });
    const prevThis = [...this];
    let editedThis = [];
    this.length = 0;

    editedThis = [
      ...prevThis.slice(0, parcelObj.index),
      editedParcel,
      ...prevThis.slice(parcelObj.index + 1),
    ];

    editedThis.forEach((parcel) => {
      this.push(parcel);
    });

    return editedParcel;
  };

  removeParcelById = (parcelId) => {
    let parcelIndex = null;
    let tempParcel = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, value] of this.entries()) {
      if (value.parcelId === parcelId) {
        parcelIndex = index;
        tempParcel = value;
        break;
      }
    }
    if (tempParcel) {
      this.splice(parcelIndex, 1);
    } else {
      return null;
    }
    return tempParcel;
  }
}
export default ParcelsCollection;

export { Parcels };
*/
