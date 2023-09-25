//INFO: Import dependencies
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fs from 'fs';

//INFO: Import local files
import { ignoreFavicon } from './middleware/favicon.js';
import { launchLogo } from './utils/ASCII.js';
import { getIpFromRequest, locateIpAddress } from './utils/IP.js';
import { formatTime } from './utils/time.js';
import { logSeparator, logEntry } from './utils/log.js';

//NOTE: get __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pixelPath = path.join(__dirname, '/pixel.png');

const app = express();
const port = 8080;

//NOTE: Middleware

//INFO: ignore Favicon (little icon in tab)
app.use(ignoreFavicon);

//NOTE: Routes

//INFO: Route for the default and others pages
app.get(['/', '/:id'], async (req, res) => {
  //INFO: Send pixel image to Route
  res.sendFile(pixelPath);

  //INFO: Get actual timeStamp
  const currentTime = new Date();
  const timeStamp = formatTime(currentTime);

  const imageID = req.params['id'] || null;

  const userAgent = req.header('User-Agent');
  const userIp = getIpFromRequest(req);
  const countryName = (await locateIpAddress(userIp))?.country_name;

  const log = logEntry({
    imageID: imageID,
    timeStamp: timeStamp,
    userAgent: userAgent,
    userIp: userIp,
    countryName: countryName
  });

  //INFO: Print data log
  console.log(log);

  //INFO: write logs data in file
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

//INFO: Launch app to specified port
app.listen(port, () => {
  console.log(`server listening on port : ${port}`);
  console.log(launchLogo());
});
