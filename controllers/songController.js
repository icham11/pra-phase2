const { Song, User, Genre } = require("../models");

class SongController {
  static async listSong(req, res) {
    try {
      const songs = await Song.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Genre,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(songs);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }
  static async addSong(req, res) {
    try {
      const { title, songUrl, imageUrl, authorId, genreId } = req.body;
      const newSong = await Song.create({
        title,
        songUrl,
        imageUrl,
        authorId,
        genreId,
      });
      res.status(201).json(newSong);
    } catch (error) {
      res.status(500).json({ message: "Gagal menambahkan lagu" });
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const song = await Song.findByPk(id);
      await Song.destroy({ where: { id } });
      res.status(200).json({ message: `Lagu ${song.title} telah dihapus` });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, songUrl, imageUrl, genreId } = req.body;
      const song = await Song.findByPk(id);

      await song.update({ title, songUrl, imageUrl, genreId });
      res.status(200).json({
        message: `Lagu ${song.title} berhasil diedit`,
        data: song,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = SongController;
