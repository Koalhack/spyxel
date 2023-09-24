import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pixelPath = path.join(__dirname, '/pixel.png');

const app = express();
const port = 8080;

function formatTime(time) {
  const format = {
    day: time.getDate(),
    month: time.getMonth() + 1,
    year: time.getFullYear(),
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds()
  };

  return `${format.year}-${format.month}-${format.day} ${format.hours}:${format.minutes}:${format.seconds}`;
}

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

  const currentTime = new Date();
  const timeStamp = formatTime(currentTime);
  const userAgent = req.header('User-Agent');
  const userIp = getIpFromRequest(req);
  const countryName = (await locateIpAddress(userIp))?.country_name;

  console.log(timeStamp);
  console.log(userAgent);
  console.log(userIp);
  console.log(countryName);
});

app.listen(port, () => {
  console.log(`server listening on port : ${port}`);
});
