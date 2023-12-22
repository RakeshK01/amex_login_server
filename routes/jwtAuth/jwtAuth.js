const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECURE_ACCESS =
  process.env.SECURE_ACCESS || "VITARAN324LIVE@03!10!202201";
const SECURE_REFRESH =
  process.env.SECURE_REFRESH || "VITARAN324LIVE@03!10!202202";

  
const VerifyToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  // if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.slice(7);
  // console.log(authHeader, token, "token")
  jwt.verify(token, SECURE_ACCESS, (err, decoded) => {
    // console.log("verifytoken", err)
    // console.log(decoded?.User, "verifytoken?.User")
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    } //invalid token
    req.decoded = decoded;
    next();
  });
};

const NewAccessToken = (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.json({
      code: 400,
      message: "Token error",
    });
  }
//   console.log(authHeader, refreshToken, "nwwwwtoken");
  let refreshToken = authHeader?.slice(7); //

  jwt.verify(refreshToken, SECURE_REFRESH, (err, decoded) => {
    console.log("NewAccessToken", err);
    // console.log(decoded?.User, "decoded?.User")
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        User: decoded?.User,
      },
      SECURE_ACCESS,
      { expiresIn: "40m" }
    );
    res.json({
      code: 200,
      message: "success",
      access_token: accessToken,
      user_data: decoded?.User,
    });
  });
};

module.exports = { VerifyToken, NewAccessToken };
