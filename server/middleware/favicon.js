export function ignoreFavicon(req, res, next) {
  if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
    return res.status(204);
  }

  next();
}
