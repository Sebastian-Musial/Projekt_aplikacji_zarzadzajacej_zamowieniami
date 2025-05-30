const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db');  //Importowanie module.exports z ustanowionym polaczeniem do bazy danych (db.js)

// Serwowanie plikow statyczne z folderu "public"
app.use(express.static('public'));

app.use(express.json()); // Jeśli będziesz wysyłać dane JSON

// API do pobierania tabeli klientów --Tabela klienci--
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

// API do pobierania tabeli zamowien --Tabela zamowienia--
app.get('/api/zamowienia', (req, res) => {
  db.query('SELECT * FROM Orders_Table', (err, results) => {
    if (err) {
      console.error('Błąd zapytania:', err);
      res.status(500).json({ error: 'Błąd bazy danych' });
    } else {
      res.json(results); // Zwracamy dane w formacie JSON
    }
  });
});

// Dodawanie klienta do bazy danych --Tabela klienci--
app.post('/api/klienci', (req, res) => {    //nasłuchiwanie zadan typu POST(Dodanie danych), Req - dane zadania z formularzy w HTML, Res wysłanie odpowiedzi z serwera do klienta
  const { Imie, Nazwisko, Adres, Numer_Telefonu } = req.body;   //Destukturyzacja req.body który zawiera dane z frontendu z fetch - dane z formularzy input

  const sql = 'INSERT INTO Client_Table (Imie, Nazwisko, Adres, Numer_Telefonu) VALUES (?, ?, ?, ?)';   //Dodaje dane w SQL. Placeholdery czyli "?"" zabezpieczają dane przez SQL injection
  db.query(sql, [Imie, Nazwisko, Adres, Numer_Telefonu], (err, result) => {
    if (err) {
      console.error('Błąd zapisu do bazy:', err);
      return res.status(500).json({ error: 'Błąd bazy danych' });
    }

    const nowyKlient = {
      ID_Client: result.insertId, //Przypisanie wartosci ID ktora wygenerowala baza MySQL
      Imie,
      Nazwisko,
      Adres,
      Numer_Telefonu
    };

    res.status(201).json(nowyKlient);   //status(201) kod HTTP oznaczający utworzenie zasobu. Zwraca "Nowyklient" w formacie JSON do frontendu w celu dodania nowego wiersza w tabeli
  });
});

// Dodawanie zamowienia do bazy danych --Tabela zamowienia--
app.post('/api/zamowienia', (req, res) => {    //nasłuchiwanie zadan typu POST(Dodanie danych), Req - dane zadania z formularzy w HTML, Res wysłanie odpowiedzi z serwera do klienta
  const { ID_Client, Nazwa_uslugi, Data_zamowienia } = req.body;   //Destukturyzacja req.body który zawiera dane z frontendu z fetch - dane z formularzy input

  const sql = 'INSERT INTO Orders_Table (ID_Client, Nazwa_uslugi, Data_zamowienia) VALUES (?, ?, ?)';   //Dodaje dane w SQL. Placeholdery czyli "?"" zabezpieczają dane przez SQL injection
  db.query(sql, [ID_Client, Nazwa_uslugi, Data_zamowienia], (err, result) => {
    if (err) {
      console.error('Błąd zapisu do bazy:', err);
      return res.status(500).json({ error: 'Błąd bazy danych' });
    }

    const noweZamowienie = {
      ID_Order: result.insertId, //Przypisanie wartosci ID ktora wygenerowala baza MySQL
      ID_Client,
      Nazwa_uslugi,
      Data_zamowienia
    };

    res.status(201).json(noweZamowienie);   //status(201) kod HTTP oznaczający utworzenie zasobu. Zwraca "NoweZamowienie" w formacie JSON do frontendu w celu dodania nowego wiersza w tabeli
  });
});

// Modyfikacja danych klienta po ID --Tabela klienci--
app.put('/api/klienci/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); //Konwersja podanego id ze stringa na int, do liczb dziesietnych (10)
  const { Imie, Nazwisko, Adres, Numer_Telefonu } = req.body; //Odczytuje dane z pliku JSON

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Nieprawidłowe ID klienta' });
  }

  const sql = `
    UPDATE Client_Table 
    SET Imie = ?, Nazwisko = ?, Adres = ?, Numer_Telefonu = ? 
    WHERE ID_Client = ?
  `;

  db.query(sql, [Imie, Nazwisko, Adres, Numer_Telefonu, id], (err, result) => {
    if (err) {
      console.error('❌ Błąd podczas aktualizacji:', err);
      return res.status(500).json({ error: 'Błąd bazy danych' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Nie znaleziono klienta o podanym ID' });
    }

    res.status(200).json({ message: 'Dane klienta zaktualizowane' });
  });
});

// Modyfikacja danych zamówienia po ID --Tabela zamówienia--
app.put('/api/zamowienia/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); //Konwersja podanego id ze stringa na int, do liczb dziesietnych (10)
  const { Nazwa_uslugi, Data_zamowienia, Data_wykonania } = req.body; //Odczytuje dane z pliku JSON

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Nieprawidłowe ID zamowienia' });
  }

  const sql = `
    UPDATE Orders_Table 
    SET Nazwa_uslugi = ?, Data_zamowienia = ?, Data_wykonania = ? 
    WHERE ID_Order = ?
  `;

  db.query(sql, [ Nazwa_uslugi, Data_zamowienia, Data_wykonania, id], (err, result) => {
    if (err) {
      console.error('❌ Błąd podczas aktualizacji:', err);
      return res.status(500).json({ error: 'Błąd bazy danych' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Nie znaleziono zamówienia o podanym ID' });
    }

    res.status(200).json({ message: 'Dane zamówienia zaktualizowane' });
  });
});

// Usuwanie klienta po ID --Tabela klienci--
app.delete('/api/klienci/:id', (req, res) => {  //parseInt --> Konwersja na liczbe calkowita (dziesiętną - 10) poniewaz ID jest przesylane w postaci stringu
  const id = parseInt(req.params.id, 10); //req.params.id --> Przechwycenie podanego :ID na froncie przez usera w celu udostepnienia zmiennej

  if (isNaN(id)) {  //Weryfikuje poprawnosc konwersji na liczbe
    return res.status(400).json({ error: 'Nieprawidłowe ID klienta' });
  }

  const sql = 'DELETE FROM Client_Table WHERE ID_Client = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Błąd zapytania DELETE:', err);
      return res.status(500).json({ error: 'Błąd bazy danych' }); //500 Internal Server Error
    }

    if (result.affectedRows === 0) {  //Sprawdza czy zostal usuniety jakikolwiek rekord (result.affectedRows [liczba usuniętych rekordów] === 0 )
      return res.status(404).json({ error: 'Nie znaleziono klienta o podanym ID' });  //404 Not Found
    }

    res.status(200).json({ message: 'Klient usunięty' });
  });
});

// Usuwanie zamowienia po ID --Tabela zamowienia--
app.delete('/api/zamowienia/:id', (req, res) => {  //parseInt --> Konwersja na liczbe calkowita (dziesiętną - 10) poniewaz ID jest przesylane w postaci stringu
  const id = parseInt(req.params.id, 10); //req.params.id --> Przechwycenie podanego :ID na froncie przez usera w celu udostepnienia zmiennej

  if (isNaN(id)) {  //Weryfikuje poprawnosc konwersji na liczbe
    return res.status(400).json({ error: 'Nieprawidłowe ID zamowienia' });
  }

  const sql = 'DELETE FROM Orders_Table WHERE ID_Order = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Błąd zapytania DELETE:', err);
      return res.status(500).json({ error: 'Błąd bazy danych' }); //500 Internal Server Error
    }

    if (result.affectedRows === 0) {  //Sprawdza czy zostal usuniety jakikolwiek rekord (result.affectedRows [liczba usuniętych rekordów] === 0 )
      return res.status(404).json({ error: 'Nie znaleziono zamówienia o podanym ID' });  //404 Not Found
    }

    res.status(200).json({ message: 'Zamówienie usunięte' });
  });
});

// Start serwera
app.listen(port, () => {
  console.log(`✅ Serwer uruchomiony na http://localhost:${port}`);
});
