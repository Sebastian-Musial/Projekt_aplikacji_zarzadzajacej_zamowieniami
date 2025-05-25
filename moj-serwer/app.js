const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db');  //Importowanie module.exports z ustanowionym polaczeniem do bazy danych (db.js)

// Serwowanie plikow statyczne z folderu "public"
app.use(express.static('public'));

app.use(express.json()); // Jeśli będziesz wysyłać dane JSON

// API do pobierania tabeli klientów
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

// Dodawanie klienta do bazy danych
app.post('/api/klienci', (req, res) => {    //nasłuchiwanie zadan typu POST(Dodanie danych), Req - dane zadania z formularzy w HTML, Res wysłanie odpowiedzi z serwera do klienta
  const { Imie, Nazwisko, Adres, Numer_Telefonu } = req.body;   //Destukturyzacja req.body który zawiera dane z frontendu z fetch - dane z formularzy input

  const sql = 'INSERT INTO Client_Table (Imie, Nazwisko, Adres, Numer_Telefonu) VALUES (?, ?, ?, ?)';   //Dodaje dane w SQL. Placeholdery czyli ? zabezpieczają dane przez SQL injection
  db.query(sql, [Imie, Nazwisko, Adres, Numer_Telefonu], (err, result) => {
    if (err) {
      console.error('Błąd zapisu do bazy:', err);
      return res.status(500).json({ error: 'Błąd bazy danych' });
    }

    const nowyKlient = {
      ID_Client: result.insertId,
      Imie,
      Nazwisko,
      Adres,
      Numer_Telefonu
    };

    res.status(201).json(nowyKlient);   //status(201) kod HTTP oznaczający utworzenie zasobu. Zwraca "Nowyklient" w formacie JSON do frontendu w celu dodania nowego wiersza w tabeli
  });
});

// Start serwera
app.listen(port, () => {
  console.log(`✅ Serwer uruchomiony na http://localhost:${port}`);
});
