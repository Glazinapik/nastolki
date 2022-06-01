const { Router } = require('express');
const checkAuth = require('../middlewares/checkAuth');
const gamesController = require('../controllers/games.controller');

const gamesRouter = Router();

gamesRouter.get('/:id', checkAuth, gamesController.getRelatedGames);
gamesRouter.get('/all', checkAuth, gamesController.getAllGames);

module.exports = gamesRouter;
