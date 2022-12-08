const getToken = (req) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  return token;
};

module.exports = getToken;
