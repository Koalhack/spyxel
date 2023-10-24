//INFO: Add String separator for log separation
export function logSeparator(separator, size) {
  return '\n' + separator.repeat(size) + '\n';
}

export function logEntry({ imageID, timeStamp, userAgent, userIp, geoInfo }) {
  return `Email/WebService visit\nImage ID: ${imageID}\nTimestamp: ${timeStamp}\nUser Agent: ${userAgent}\nIP Address: ${userIp}\nGeolocation Infos: ${geoInfo}`;
}
