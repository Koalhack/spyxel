//INFO: Get IP from user
export function getIpFromRequest(req) {
  let ips = (
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    ''
  ).split(',');

  return ips[0].trim();
}

//INFO: Get IP address location with geolocation-db
export async function locateIpAddress(Address) {
  let json = null;
  try {
    const response = await fetch(`https://geolocation-db.com/json/${Address}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    json = await response.json();
  } catch (err) {
    if (err) throw err;
  }

  return json;
}
