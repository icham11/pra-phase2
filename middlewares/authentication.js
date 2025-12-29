const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorization", message: "Silahkan login dulu!" };
    }

    const payload = jwt.verify(access_token, "rahasia");
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorization", message: "User tidak valid" };
    }
    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = authentication;
