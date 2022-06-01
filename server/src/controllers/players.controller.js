const { Meeting, User, Player } = require('../../db/models');

const addPlayers = async (req, res) => {
  const { id } = req.params;
  if (req.session.user.id && id) {
    try {
      const newPlayer = await Player.create({
        meeting_id: id,
        user_id: req.session.user.id,
        flag: false,
      });

      return res.json(newPlayer); // что нужно вернуть после создания ?
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
};

// const getPlayers = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const allPlayers = await Player.findAll({
//       where: { meeting_id: id },
//       raw: true,
//     });
//     const usersId = allPlayers.map((e) => e.user_id);
//     const temp = await User.findAll({ where: { id: usersId }, raw: true });
//     return res.json(temp);
//   } catch (error) {
//     return res.sendStatus(500);
//   }
// };
const getPlayers = async (req, res) => {
  const { id } = req.params;
  try {
    const allPlayers = await Meeting.findOne({
      where: { id },
      include: User,
    });
    return res.json(allPlayers.users); // возвращает всех добавившихся пользоватей
  } catch (error) {
    return res.sendStatus(500);
  }
};

const confirmedPlayer = async (req, res) => {
  const { playersId, meetingId } = req.body;
  let updatedFields = Object.entries(req.body).filter((el) => el[1]);
  if (updatedFields.length) {
    updatedFields = Object.fromEntries(updatedFields);
    try {
      // eslint-disable-next-line max-len
      const [, updatedPlaer] = await Player.update(updatedFields, {
        where: { user_id: playersId, meeting_id: meetingId },
        flag: true,
        returning: true,
        plain: true,
        raw: true,
      });
      return res.json(updatedPlaer);// что нужно вернуть после редактирования
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(418);
};

const deletePlayer = async (req, res) => {
  const { playersId, meetingId } = req.body;
  try {
    await Player.destroy({ where: { user_id: playersId, meeting_id: meetingId } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getPlayers,
  addPlayers,
  deletePlayer,
  confirmedPlayer,
};
