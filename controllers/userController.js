const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Email atau Password salah" });
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Email atau Password salah" });
      }
      const access_token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ access_token });
    } catch (error) {
      console.log("🚀 ~ UserController ~ login ~ error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async register(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role: role || "Staff",
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
        address: newUser.message,
        message: "User berhasil dibuat",
      });
    } catch (error) {
      console.log("🚀 ~ UserController ~ register ~ error:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async template(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = UserController;
