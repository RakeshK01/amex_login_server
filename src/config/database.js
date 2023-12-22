const Pool = require("pg").Pool;
require('dotenv').config()

const poolConfig =
{
    user: process.env.DB_USER,
    password: process.env.USER_PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
};

const pool = new Pool(poolConfig);



module.exports = pool;