const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "pKxLNf714hEGC8r8",
    host: "127.0.0.1",
    port: 5435,
    database: "users"
});

module.exports = pool;