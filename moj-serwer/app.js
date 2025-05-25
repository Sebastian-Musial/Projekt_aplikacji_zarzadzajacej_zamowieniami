const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Serwowanie plikow statyczne z folderu "public"
app.use(express.static('public'));

const db = require('./db');  //Importowanie module.exports z ustanowionym polaczeniem do bazy danych (db.js)
//app.use(express.json()); // Jeśli będziesz wysyłać dane JSON

// API do pobierania klientów
app.get('/api/klienci', (req, res) => {
  db.query('SELECT * FROM Client_Table', (err, results) => {
    if (err) {
      console.error('Błąd zapytania:', err);
      res.status(500).json({ error: 'Błąd bazy danych' });
    } else {
      res.json(results); // Zwracamy dane w formacie JSON
    }
  });
});

// Start serwera
app.listen(port, () => {
  console.log(`✅ Serwer uruchomiony na http://localhost:${port}`);
});
