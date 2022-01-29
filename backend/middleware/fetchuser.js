const jwt = require("jsonwebtoken");
const JWT = "inotebookauthentication";
const fetchUser = (req, res, next) => {
  //Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid tokem" });
  }
  try {
    const string = jwt.verify(token, JWT);
    req.user = string.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid tokem" });
  }
};
module.exports = fetchUser;
