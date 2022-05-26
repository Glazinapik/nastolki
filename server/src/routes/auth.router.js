const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const checkAuth = require('../middlewares/checkAuth');

const authRouter = Router();

authRouter.post('/user/signup', authController.signUp);
authRouter.post('/user/signin', authController.signIn);
authRouter.get('/user/signout', authController.signOut);
authRouter.get('/check', checkAuth, authController.checkAuth);

module.exports = authRouter;
