const { Router } = require('express');
const playersController = require('../controllers/players.controller');
const checkAuth = require('../middlewares/checkAuth');
const checkAuthor = require('../middlewares/checkAuthor');

const playersRouter = Router();

playersRouter.route('/all')
.get(playersController.getAllPlayers)

playersRouter.route('/:id')
  .get(checkAuth, playersController.getPlayers)
  .post(checkAuth, playersController.addPlayers)
  .delete(checkAuth, checkAuthor, playersController.deletePlayer)
  .put(checkAuth, checkAuthor, playersController.confirmedPlayer);

module.exports = playersRouter;
