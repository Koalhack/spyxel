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

async function locateIpAddress(Address) {
  const response = await fetch(`https://geolocation-db.com/json/${Address}`);
  return await response.json();
}

app.get('/', async (req, res) => {
  res.sendFile(pixelPath);

  const userIp = getIpFromRequest(req);
  const countryName = (await locateIpAddress(userIp))?.country_name;

  console.log(userIp);
  console.log(countryName);
});

app.listen(port, () => {
  console.log(`server listening on port : ${port}`);
});
