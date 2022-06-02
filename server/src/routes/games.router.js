// const { Router } = require('express');
// const checkAuth = require('../middlewares/checkAuth');
// const gamesController = require('../controllers/games.controller');

// const gamesRouter = Router();

// // gamesRouter.get('/:id', checkAuth, gamesController.getRelatedGames);
// // gamesRouter.get('/all', checkAuth, gamesController.getAllGames);
// gamesRouter.get('/allGames', gamesController.getAllGames);
// gamesRouter.get('/:id', gamesController.getRelatedGames);

// module.exports = gamesRouter;

const { Router } = require('express');
const checkAuth = require('../middlewares/checkAuth');
const gamesController = require('../controllers/games.controller');

const gamesRouter = Router();

gamesRouter.get('/all', gamesController.getAllGames);
gamesRouter.route('/:id')

  .get(checkAuth, gamesController.getRelatedGames);


module.exports = gamesRouter;
