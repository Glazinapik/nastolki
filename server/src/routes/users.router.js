const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const checkAuth = require('../middlewares/checkAuth');
const checkAuthor = require('../middlewares/checkAuthor');
const upload = require('../middlewares/multer.middleware');

const usersRouter = Router();

usersRouter.get('/', checkAuth, usersController.getAllUsers);
usersRouter.route('/:id')
  .patch(checkAuth, checkAuthor, upload.single('file'), usersController.editUser)
  .get(checkAuth, usersController.getUser);

module.exports = usersRouter;
