require('dotenv').config();

const dbConfig = process.env.NODE_ENV === 'production' ? process.env.JAWSDB_URL : {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

module.exports = {
  client: 'mysql2',
  connection: dbConfig,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
