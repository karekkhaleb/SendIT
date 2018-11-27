import mockData from './mockdata';
import conn from '../db/conn';

class Parcel {
  Parcels = [...mockData];

  createNewParcel({
    userId, weight, pickupLocation, destination, description,
  }) {
    const price = weight * 12; // 12 is the price of 1kg in USD
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
      status: 'in-progress',
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

  changeParcelStatus(parcelId, status) {
    let parcelIndex = 0;
    let tempParcel = null;
    // console.log(status);

    // eslint-disable-next-line no-restricted-syntax
    for (const parcel of this.Parcels) {
      if (parcel.parcelId === parcelId) {
        tempParcel = parcel;
        break;
      }
      parcelIndex += 1;
    }

    if (tempParcel && (tempParcel.status !== 'delivered' && tempParcel.status !== 'canceled')) {
      const updatedParcel = { ...tempParcel, status };
      this.Parcels = [
        ...this.Parcels.slice(0, parcelIndex),
        updatedParcel,
        ...this.Parcels.slice(parcelIndex + 1),
      ];
      return updatedParcel;
    }
    return null;
  }

//   removeParcelById(parcelId) {
//     let parcelIndex = 0;
//     let tempParcel = null;
//     // eslint-disable-next-line no-restricted-syntax
//     for (const parcel of this.Parcels) {
//       if (parcel.parcelId === parcelId) {
//         tempParcel = parcel;
//         break;
//       }
//       parcelIndex += 1;
//     }
//     // console.log(this.Parcels);
//     if (tempParcel) {
//       this.Parcels.splice(parcelIndex, 1);
//       return tempParcel;
//     }
//     return null;
//   }
  signup(authData) {
    return conn.signup(authData);
  }
}

export default new Parcel();
