const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lavafist1210145',
  database: 'app'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.stack);
    return;
  }
  console.log('MySQL connected as id ' + db.threadId);
});

module.exports = db;
