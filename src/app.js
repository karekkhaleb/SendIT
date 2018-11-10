import express from 'express';
import parcelsRoutesV1, { myParcels } from './routes/parcelsRoutesV1';

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());

app.use('/api/v1/parcels/', parcelsRoutesV1);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my API, this is the information about my api',
    apiV1Routes: {
      gettingAllParcels: {
        url: '/api/v1/parcels',
        method: 'GET',
      },
      gettingASingleParcel: {
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
      },
    },
  });
});

app.get('/api/v1/users/:userId/parcels', (req, res) => {
  const userId = Number.parseInt(req.params.userId, 10);
  const userParcels = myParcels.getParcelsByUserId(userId);
  if (userParcels) {
    res.status(200).json(userParcels);
  } else {
    res.status(200).json([]);
  }
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`the app started on port ${port}`));
