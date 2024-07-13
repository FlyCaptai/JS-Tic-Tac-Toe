// src/server.js
import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Statischen Ordner setzen
app.use(express.static(path.join(process.cwd(), 'public')));

app.listen(port, () => {
  console.log(`Server läuft unter http://127.0.0.1:${port}/`);
});
