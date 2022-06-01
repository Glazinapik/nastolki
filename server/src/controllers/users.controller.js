const { User } = require('../../db/models');

const editUser = async (req, res) => {
  console.log(req.file.path);
  console.log(req.body);
  let updatedFields = Object.entries(req.body).filter((el) => el[1]);
  console.log(updatedFields);
  if (updatedFields.length) {
    updatedFields = Object.fromEntries(updatedFields); // {key:value}
    try {
      // eslint-disable-next-line max-len
      const [, updatedUser] = await User.update(updatedFields, {
        where: { id: req.session.user.id },
        photo: req.file.path.slice(6),
        returning: true,
        plain: true,
        raw: true,
      });
      return res.json(updatedUser);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(418);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const currentUser = await User.findByPk(id);
    setTimeout(() => {
      res.json(currentUser);
    }, 2e3);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.json(allUsers);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  editUser,
  getUser,
  getAllUsers,
};
