import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pixelPath = path.join(__dirname, '/pixel.png');

const app = express();
const port = 8080;

app.get('/', function (req, res) {
  res.sendFile(pixelPath);
});

app.listen(port, () => {
  console.log(`server listening on port : ${port}`);
});
