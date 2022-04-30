const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
  return jwt.sign({ _id: id }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

function verifyJWT(req, res, next) {
  const token = req.header("x-access-token");

  if (!token) {
    res.status(401).send("Access Denied");
  }

  try {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (error) {
        res.sendStatus(403);
        return;
      }

      req.tokenData = decoded;
      next();
    });
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = {
  verifyJWT,
  generateAccessToken,
};
