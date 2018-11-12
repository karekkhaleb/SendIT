class Parcel {
  constructor({ ...payload }) {
    this.parcelId = payload.parcelId;
    this.userId = payload.userId;
    this.weight = payload.weight;
    this.pickupLocation = payload.pickupLocation;
    this.currentLocation = payload.pickupLocation;
    this.destination = payload.destination;
    this.description = payload.description;
    this.delivered = payload.delivered;
    this.price = payload.price;
  }
}

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
