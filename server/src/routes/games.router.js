const { Router } = require('express');
const checkAuth = require('../middlewares/checkAuth');
const gamesController = require('../controllers/games.controller');

const gamesRouter = Router();

gamesRouter.get('/all', checkAuth, gamesController.getAllGames);
gamesRouter.get('/:id', checkAuth, gamesController.getRelatedGames);

module.exports = gamesRouter;
