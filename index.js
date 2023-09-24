//INFO: Import dependencies
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fs from 'fs';

//NOTE: get __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pixelPath = path.join(__dirname, '/pixel.png');

const app = express();
const port = 8080;

//NOTE: Format the time (Y-m-d H:M:S)
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

//NOTE: Get IP from user
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

//NOTE: Get IP address location with geolocation-db
async function locateIpAddress(Address) {
  let json = null;
  try {
    const response = await fetch(`https://geolocation-db.com/json/${Address}`);
    json = await response.json();
  } catch (err) {
    if (err) throw err;
  }

  return json;
}

//NOTE: Add String separator for log separation
function logSeparator(separator, size) {
  return '\n' + separator.repeat(size) + '\n';
}

function logEntry({ timeStamp, userAgent, userIp, countryName }) {
  return `Email/WebService visit\nTimestamp: ${timeStamp}\nUser Agent: ${userAgent}\nIP Address: ${userIp}\nCountry Name: ${countryName}`;
}

//NOTE: Route for the default page
app.get('/', async (req, res) => {
  //NOTE: Send pixel image to route
  res.sendFile(pixelPath);

  const currentTime = new Date();
  const timeStamp = formatTime(currentTime);

  const userAgent = req.header('User-Agent');
  const userIp = getIpFromRequest(req);
  const countryName = (await locateIpAddress(userIp))?.country_name;

  const log = logEntry({
    timeStamp: timeStamp,
    userAgent: userAgent,
    userIp: userIp,
    countryName: countryName
  });

  //NOTE: Print data log
  console.log(log);

  //NOTE: write logs data in file
  fs.appendFile(
    `${__dirname}/log.txt`,
    log + logSeparator('=', 20),
    {},
    err => {
      if (err) throw err;
      console.log('Saved');
    }
  );
});

//NOTE: Launch app to specified port
app.listen(port, () => {
  console.log(`server listening on port : ${port}`);
});
