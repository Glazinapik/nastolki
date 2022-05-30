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
        photo: 'https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375',
      });
      req.session.user = {
        id: newUser.id,
        name: newUser.name,
      };

      return res.json({ id: newUser.id, name: newUser.userName });
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
};

const signIn = async (req, res) => {
  const { password, email } = req.body;

  if (password && email) {
    try {
      const currentUser = await User.findOne({ where: { email } });
      if (currentUser && currentUser.password === sha256(password)) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
        };

        return res.json({ id: currentUser.id, name: currentUser.userName });
      }
      return res.sendStatus(401);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
};

const signOut = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    res.clearCookie(req.app.get('cookieName'));

    return res.sendStatus(200);
  });
};

const checkAuth = async (req, res) => {
  try {
    console.log(req.session);
    const user = await User.findByPk(req.session.user.id);
    console.log(user);
    return res.json({ id: user.id, userName: user.userName });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
};
