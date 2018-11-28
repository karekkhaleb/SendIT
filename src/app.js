/* eslint-disable prefer-template */
import express from 'express';
import dotenv from 'dotenv';
import parcelsRoutesV1 from './routes/parcelsRoutesV1';
import authRoutes from './routes/authRoutes';
import database from './db/conn';

dotenv.config();

const port = process.env.PORT || 9000;
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/parcels/', parcelsRoutesV1);
app.use('/api/v1/auth', authRoutes);

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
          userId: 'The id of the user creating the parcel',
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

app.get('/api/v1/users/:userId/parcels', async (req, res) => {
  const userId = Number.parseInt(req.params.userId, 10);
  const userParcels = await database.getParcelsByUserId(userId);
  res.status(200).json({ parcels: userParcels });
});


// console.log(process.env.NAME);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`the app started on port ${port}`));
