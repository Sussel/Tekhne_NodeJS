const PORT = process.env.PORT || 3000;
const SEED = process.env.SEED || "seed-desarrollo";
const TIME_TOKEN = process.env.TIME_TOKEN || 60 * 60 * 24 * 30;

const development = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DATABASE || "tienda-libros",
  host: process.env.DB_URL || "localhost",
  dialect: process.env.DIALECT || "mysql",
};

const test = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DATABASE || "test-tienda-libros",
  host: process.env.DB_URL || "127.0.0.1",
  dialect: process.env.DIALECT || "mysql",
};

const production = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DATABASE || "tienda-libros",
  host: process.env.DB_URL || "127.0.0.1",
  dialect: process.env.DIALECT || "mysql",
};

module.exports = {
  PORT,
  SEED,
  TIME_TOKEN,
  development,
  test,
  production
};
