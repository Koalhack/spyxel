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
  const APIurl = 'http://ip-api.com/json';
  const QueryString = new URLSearchParams({
    fields: 'status,message,country,regionName,city,zip,lat,lon'
  }).toString();
  const options = {
    method: 'GET',
    headers: new Headers({
      accept: 'application/json'
    })
  };

  let json = null;
  try {
    const response = await fetch(
      `${APIurl}/${Address}?${QueryString}`,
      options
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    json = await response.json();
  } catch (err) {
    if (err) throw err;
  }

  return json;
}
