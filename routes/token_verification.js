const jwt = require("jsonwebtoken");

function verification(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({
      valid:false,
      status: 401,
      error: "Access denied! header auth-token is missing"
    });

  try {
    const user_id = jwt.verify(token, process.env.jwt_secret);
    req.user_id = user_id._id;
  } catch (err) {
    return res.status(400).send({
      valid:false,
      status: 401,
      error: err.message
    });
  }
  next();
}

module.exports = verification;
