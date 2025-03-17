require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const pg = require('pg');

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.query(`
  UPDATE posts
  SET loc = POINT(lng,lat)
  WHERE loc IS NULL;
`).then(() => {
  console.log('Update is done');
  pool.end();
}).catch((err) => console.log(err.message));