import { Pool } from 'pg';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const jwtSecretWord = 'ryiewoer';
const pool = new Pool();
const connect = async () => pool.connect();

const signup = async (authData) => {
  const query = `
    insert into users 
    (user_email, user_password) 
    values 
    ($1, $2);
  `;
  const hashedPassword = bcrypt.hashSync(authData.password);
  const params = [
    authData.email,
    hashedPassword,
  ];
  const connection = await connect();
  try {
    await connection.query(query, params);
    return true;
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    connection.release();
  }
};

const signin = async (authData) => {
  const query = `
    select * from users 
    where user_email = $1;
  `;
  const params = [
    authData.email,
  ];
  const connection = await connect();
  try {
    const result = await connection.query(query, params);
    if (result.rows.length > 0) {
      let token = null;
      // eslint-disable-next-line no-restricted-syntax
      for (const user of result.rows) {
        const hashedPassword = user.user_password.toString();
        if (bcrypt.compareSync(authData.password, hashedPassword)) {
          token = {
            token: jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 60),
              data: user,
            }, jwtSecretWord),
          };
          break;
        }
      }
      return token;
    }
    return { message: 'No such a user!' };
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    connection.release();
  }
};

const updateParcel = async (parcelId, { ...payload }) => {
  let parcel = null;
  const fetchQuery = 'select * from parcels where id = $1';
  const params = [parcelId];
  const connection = await connect();
  try {
    const result = await connection.query(fetchQuery, params);
    if (result.rows.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      parcel = result.rows[0];
    } else return { message: 'no match' };
  } catch (error) {
    console.log(error);
    return null;
  }
  if (parcel && (parcel.status === 'canceled' || parcel.status === 'delivered')) {
    connection.release();
    return { message: `this parcel is already ${parcel.status}` };
  }
  /**
   *action stands for what we want to change
   * either status or current location
   */
  let query = null;
  let action = null;
  if (payload.status) {
    query = 'update parcels set status = $1 where id = $2;';
    action = payload.status;
  } else if (payload.currentLocation) {
    query = 'update parcels set current_location = $1 where id = $2;';
    action = payload.currentLocation;
  } else if (payload.destination) {
    query = 'update parcels set destination = $1 where id = $2;';
    action = payload.destination;
  }
  const updateParams = [action, parcelId];

  try {
    await connection.query(query, updateParams);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
};

const getParcelsByUserId = async (userId) => {
  const query = 'select * from parcels where user_id = $1';
  const connection = await connect();
  try {
    const result = await connection.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
};

export default {
  signup,
  signin,
  updateParcel,
  getParcelsByUserId,
};
