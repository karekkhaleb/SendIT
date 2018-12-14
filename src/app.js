/* eslint-disable prefer-template */
import express from 'express';
import dotenv from 'dotenv';
import parcelsRoutesV1 from './routes/parcelsRoutesV1';
import authRoutes from './routes/authRoutes';
import userRoutesV1 from './routes/userRoutesV1';
// import '@babel/polyfill';

dotenv.config();

const port = process.env.PORT || 9000;
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('UI'));

app.use('/api/v1/parcels/', parcelsRoutesV1);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutesV1);


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my API, this is the information about my api',
    apiV1Routes: {
      gettingAllParcels: {
        url: '/api/v1/parcels',
        method: 'GET',
      },
      gettingASingleParcelById: {
        url: '/api/v1/parcels/<parcelId>',
        method: 'GET',
      },
      gettingParcelsByUserId: {
        url: '/api/v1/users/<userId>/parcels',
        method: 'GET',
      },
      creatingAParcel: {
        url: '/api/v1/parcels',
        method: 'POST',
        objectFormat: {
          weight: 'The weight of the parcel',
          pickupLocation: 'The location where the parcel should be picked up',
          destination: 'The parcel\'s destination',
          description: 'Some info about the parcel',
        },
      },
      cancelParcel: {
        url: '/api/v1/parcels/<parcelId>/cancel',
        method: 'PUT',
        objectFormat: {
          status: 'the new status of the parcel(make sure it is either delivered or canceled)',
        },
      },
    },
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`the app started on port ${port}`));
