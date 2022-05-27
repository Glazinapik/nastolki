require('dotenv').config();

const {
  DB_USERNAME, DB_USER_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT,
} = process.env;

module.exports = {
  development: {
    username: 'vova',
    password: '123',
    database: 'nastolki',
    host: DB_HOST,
    dialect: 'postgres',
  },
};
