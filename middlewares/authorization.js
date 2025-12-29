const { Song } = require("../models");

async function authorization(req, res, next) {
  try {
    const songId = req.params.id;
    const authenticatedUser = req.user;
    const song = await Song.findByPk(songId);
    if (!song) {
      res.status(404).json({ message: "Lagu tidak ditemukan" });
    }
    if (authenticatedUser.role === "Admin") {
      return next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    if (error.name === "Forbidden") {
      res.status(403).json({ message: "Dilarang sentuh barang orang lain" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = authorization;
