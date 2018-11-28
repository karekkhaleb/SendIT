import database from '../db/conn';

const getParcelsByUserId = async (req, res) => {
  const userId = Number.parseInt(req.params.userId, 10);
  const userParcels = await database.getParcelsByUserId(userId);
  res.status(200).json({ parcels: userParcels });
};

export default {
  getParcelsByUserId,
};
