import { Pool } from 'pg';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import jwtUtil from '../jwt/jwtUtil';

let pool;

if (process.env.DATABASE_URL) {
  const connectionString = process.env.DATABASE_URL;
  pool = new Pool({
    connectionString,
  });
} else pool = new Pool();
const connect = async () => pool.connect();
const generateTables = async () => {
  const userTableQuery = `create table if not exists users
    (
        id SERIAL primary key,
        user_email varchar NOT NULL,
        user_password varchar NOT NULL,
        user_role varchar NOT null default 'user' 
    );`;
  const parcelsTableQuery = `create table if not exists parcels
    (
        id SERIAL primary key,
        user_id integer NOT NULL,
        weight integer NOT NULL,
        description varchar NOT NULL,
        pickup_location varchar NOT NULL,
        current_location varchar NOT NULL,
        destination varchar NOT NULL,
        price integer NOT NULL,
        status varchar NOT NULL,
        created_at timestamp without time zone DEFAULT now(),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`;
  const createAdminQuery = `
  insert into users
  (
    user_email,
    user_password,
    user_role
  )
  select
    $1,
    $2,
    'admin'
  where not exists (select * from users);
  `;
  const connection = await connect();
  await connection.query(userTableQuery);
  await connection.query(parcelsTableQuery);
  const adminEmail = process.env.ADMINEMAIL;
  const adminPassword = bcrypt.hashSync(process.env.ADMINEMAIL);
  await connection.query(createAdminQuery, [adminEmail, adminPassword]);
};

generateTables();

const signup = async (authData) => {
  const query = `
    insert into users 
    (user_email, user_password) 
    values 
    ($1, $2) returning *;
  `;
  const hashedPassword = bcrypt.hashSync(authData.password);
  const params = [
    authData.email,
    hashedPassword,
  ];
  const connection = await connect();
  try {
    const newUser = await connection.query(query, params);
    return {
      token: jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: newUser.rows[0],
      }, jwtUtil.jwtSecretWord),
    };
  } catch (e) {
    return null;
  } finally {
    connection.release();
  }
};

const adminSignup = async (authData) => {
  const query = `
    insert into users 
    (user_email, user_password, user_role) 
    values 
    ($1, $2, 'admin') returning *;
  `;
  const hashedPassword = bcrypt.hashSync(authData.password);
  const params = [
    authData.email,
    hashedPassword,
  ];
  const connection = await connect();
  try {
    const newUser = await connection.query(query, params);
    return {
      token: jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: newUser.rows[0],
      }, jwtUtil.jwtSecretWord),
    };
  } catch (e) {
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
            }, jwtUtil.jwtSecretWord),
          };
          break;
        }
      }
      return token;
    }
    return null;
    // return { message: 'No such a user!' };
  } catch (e) {
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
    query = 'update parcels set status = $1 where id = $2 returning *;';
    action = payload.status;
  } else if (payload.currentLocation) {
    query = 'update parcels set current_location = $1 where id = $2 returning *;';
    action = payload.currentLocation;
  } else if (payload.destination) {
    query = 'update parcels set destination = $1 where id = $2 returning *;';
    action = payload.destination;
  }
  const updateParams = [action, parcelId];

  try {
    const updatedParcel = await connection.query(query, updateParams);
    return updatedParcel.rows;
  } catch (error) {
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
    return null;
  } finally {
    connection.release();
  }
};

const getAllParcels = async () => {
  const query = 'select * from parcels';
  const connection = await connect();
  try {
    const result = await connection.query(query);
    return result.rows;
  } catch (error) {
    return null;
  } finally {
    connection.release();
  }
};

const createParcel = async (parcel) => {
  const query = `insert into parcels (
    user_id, weight, description, pickup_location, current_location, destination, price, status
    ) values(
      $1, $2, $3, $4, $5, $6, $7, $8
    ) returning *;
  `;
  const params = [
    parcel.userId,
    parcel.weight,
    parcel.description,
    parcel.pickupLocation,
    parcel.currentLocation,
    parcel.destination,
    parcel.price,
    parcel.status,
  ];

  const connection = await connect();
  try {
    const result = await connection.query(query, params);
    return result.rows;
  } catch (error) {
    return null;
  } finally {
    connection.release();
  }
};

const getParcelById = async (parcelId) => {
  const query = 'select * from parcels where id = $1';
  const params = [parcelId];
  const connection = await connect();
  try {
    const result = await connection.query(query, params);
    if (result.rows) {
      return result.rows[0];
    }
    return null;
  } catch (error) {
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
  getAllParcels,
  createParcel,
  getParcelById,
  adminSignup,
};
