import express from 'express';
import parcelsRoutesV1, { myParcels } from './routes/parcelsRoutesV1';

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());

app.use('/api/v1/parcels/', parcelsRoutesV1);

app.get('/', (req, res) => {
  res.send(`
  <h2>Home Page</h2>
  <h3>please use the url in this fashion(/api/v1/parcels/...)</h3>
  `);
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
