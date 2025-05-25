const express = require('express');
const app = express();
const port = 3000;

// Główna strona
app.get('/', (req, res) => {
  res.send('Serwer Express działa poprawnie!');
});

// Start serwera
app.listen(port, () => {
  console.log(`✅ Serwer uruchomiony na http://localhost:${port}`);
});
