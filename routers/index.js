const express = require("express");
const SongController = require("../controllers/songController");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/songs", SongController.listSong);
router.post("/songs", SongController.addSong);

router.delete("/songs/:id", authorization, SongController.delete);
router.put("/songs/:id", authorization, SongController.update);

module.exports = router;
