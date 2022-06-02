const { User } = require('../../db/models');

const editUser = async (req, res) => {
  let updatedFields = Object.entries(req.body).filter((el) => el[1]);
  const puthPhoto = req.file.path.slice(6);
  console.log(puthPhoto, '<------------');
  if (updatedFields.length) {
    updatedFields = Object.fromEntries(updatedFields); // {key:value}
    updatedFields.photo = puthPhoto;
    try {
      // eslint-disable-next-line max-len
      // console.log('==>', updatedFields);
      console.log('>>>>>>>>>>>>>>>', updatedFields);
      const [, updatedUser] = await User.update(updatedFields, {
        where: { id: req.session.user.id },
        returning: true,
        plain: true,
        raw: true,
      });
      console.log('======>', updatedUser);
      return res.json(updatedUser);
    } catch (error) {
      // console.log(error);
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
