const sha256 = require('sha256');
const { User } = require('../../db/models');

const signUp = async (req, res) => {
  const { userName, password, email } = req.body;
  if (userName && password && email) {
    try {
      const newUser = await User.create({
        userName,
        password: sha256(password),
        email,
        photo: '/img/startFoto.jpeg',
      });
      req.session.user = {
        id: newUser.id,
        name: newUser.name,
      };
      return res.json({
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
        photo: newUser.photo,
        info: newUser.info,
        gender: newUser.gender,
        dateborn: newUser.dateborn,
        city: newUser.city,
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
};

const signIn = async (req, res) => {
  const { password, email } = req.body;
  if (password && email) {
    try {
      const currentUser = await User.findOne({ where: { email }, raw: true });
      if (currentUser && currentUser.password === sha256(password)) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
        };
        return res.json(currentUser);
      }
      return res.sendStatus(401);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
};

const signOut = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.sendStatus(500);
    }
    res.clearCookie(req.app.get('cookieName'));
    return res.sendStatus(200);
  });
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    return res.json({
      id: user.id,
      userName: user.userName,
      email: user.email,
      photo: user.photo,
      info: user.info,
      gender: user.gender,
      dateborn: user.dateborn,
      city: user.city,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
};
