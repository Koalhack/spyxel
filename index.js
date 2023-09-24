import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pixelPath = path.join(__dirname, '/pixel.png');

const app = express();
const port = 8080;

function getIpFromRequest(req) {
  let ips = (
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    ''
  ).split(',');

  return ips[0].trim();
}

app.get('/', function (req, res) {
  const userIp = getIpFromRequest(req);
  console.log(userIp);
  res.sendFile(pixelPath);
});

app.listen(port, () => {
  console.log(`server listening on port : ${port}`);
});
