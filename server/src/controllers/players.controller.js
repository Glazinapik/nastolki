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
      return res.json(newPlayer); 
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
};

const getPlayers = async (req, res) => {
  const { id } = req.params;
  try {
    const allPlayers = await Meeting.findOne({
      where: {id},
      include: {
        model: User,
        through: { attributes: ['flag', 'meeting_id'] },
      },
    });
    return res.json(allPlayers.Users);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getAllPlayers = async (req, res) => {
  try {
    const allPlayers = await Meeting.findAll({
      include: {
        model: User,
        through: {attributes:['flag', 'meeting_id']},
      },
    });
    return res.json(allPlayers);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const confirmedPlayer = async (req, res) => {
  const { playersId, meetingId } = req.body;
  try {
    await Player.update(
      { flag: true },
      { where: { user_id: playersId, meeting_id: meetingId } },
    );
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deletePlayer = async (req, res) => {
  const { playersId, meetingId } = req.body;
  try {
    await Player.update(
      { flag: null },
      { where: { user_id: playersId, meeting_id: meetingId } },
    );
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
  getAllPlayers,
};
