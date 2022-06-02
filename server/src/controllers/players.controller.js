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


const getPlayers = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const allPlayers = await Meeting.findOne({
      where: { id ,
        //'$Users->Players.flag$': true
      },
      include: {
        model: User,
        through: {attributes:['flag', 'meeting_id']},
      },
    });
    
    // console.dir(JSON.parse(JSON.stringify(allPlayers)), {depth: null})
    return res.json(allPlayers.Users); // возвращает всех добавившихся пользоватей
  } catch (error) {
    console.log(error)
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
    console.log(error)
    return res.sendStatus(500);
  }
};

const confirmedPlayer = async (req, res) => {
  const { playersId, meetingId } = req.body;
    try {
      // eslint-disable-next-line max-len
      await Player.update(
        {flag:true},
        {where: { user_id: playersId, meeting_id: meetingId }});
        res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(500);
    }
  };
  

const deletePlayer = async (req, res) => {
  const { playersId, meetingId } = req.body;
  try {
    await Player.update(
      {flag:null},
      {where: { user_id: playersId, meeting_id: meetingId }});
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
