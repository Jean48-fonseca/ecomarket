const express = require('express');
const fetch = require('node-fetch'); // Si usas Node <18
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Untitled-1.html'));
});

// ... Aquí va tu endpoint /ecoia ...

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
