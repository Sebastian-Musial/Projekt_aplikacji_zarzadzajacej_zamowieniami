const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Serwowanie plikow statyczne z folderu "public"
app.use(express.static('public'));

// Start serwera
app.listen(port, () => {
  console.log(`✅ Serwer uruchomiony na http://localhost:${port}`);
});
