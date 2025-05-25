const mysql = require('mysql2');

// Dane logowania do MySQL – dostosuj do swojej konfiguracji
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQL',
  database: 'Test_DB'
});

// Połączenie
db.connect((err) => {
  if (err) {
    console.error('❌ Błąd połączenia z bazą danych:', err);
  } else {
    console.log('✅ Połączono z bazą danych MySQL!');
  }
});

module.exports = db;
