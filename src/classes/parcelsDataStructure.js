import mockData from './mockdata';

class Parcel {
  Parcels = [...mockData];

  createNewParcel({
    userId, weight, pickupLocation, destination, description,
  }) {
    const price = weight * 12; // 12 is the price of 1kg in USD
    if (!this.Parcels.length) {
      const newParcel = {
        userId,
        weight,
        pickupLocation,
        destination,
        description,
        price,
        parcelId: 1,
        currentLocation: pickupLocation,
        delivered: false,
      };
      this.Parcels.push(newParcel);
      return newParcel;
    }
    const parcelId = this.Parcels[this.Parcels.length - 1].parcelId + 1;
    const newParcel = {
      parcelId,
      userId,
      weight,
      pickupLocation,
      destination,
      description,
      price,
      currentLocation: pickupLocation,
      delivered: false,
    };
    this.Parcels.push(newParcel);
    return newParcel;
  }

  getParcelById(parcelId) {
  // eslint-disable-next-line no-restricted-syntax
    for (const parcel of this.Parcels) {
      if (parcel.parcelId === parcelId) {
        return parcel;
      }
    }
    return null;
  }

  getParcelsByUserId(userId) {
    const parcelsForOneUser = [];
    this.Parcels.forEach((parcel) => {
      if (parcel.userId === userId) {
        parcelsForOneUser.push(parcel);
      }
    });
    if (parcelsForOneUser.length) return parcelsForOneUser;
    return [];
  }

  removeParcelById(parcelId) {
    let parcelIndex = 0;
    let tempParcel = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const parcel of this.Parcels) {
      if (parcel.parcelId === parcelId) {
        tempParcel = parcel;
        break;
      }
      parcelIndex += 1;
    }
    if (tempParcel) {
      this.Parcels.splice(parcelIndex, 1);
      return tempParcel;
    }
    return null;
  }
}

export default new Parcel();
