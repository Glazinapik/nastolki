const { Router } = require('express');
const checkAuth = require('../middlewares/checkAuth');
const gamesController = require('../controllers/games.controller');

const gamesRouter = Router();

gamesRouter.get('/all', gamesController.getAllGames);
gamesRouter.route('/:id')
  .get(checkAuth, gamesController.getRelatedGames);

module.exports = gamesRouter;
