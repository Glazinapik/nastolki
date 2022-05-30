const { Meeting } = require('../../db/models');

const createMeeting = async (req, res) => {
  const {
    title, place, date, amount,
  } = req.body;

  if (place && date && amount) {
    try {
      const newMeeting = await Meeting.create({
        title,
        place,
        date,
        amount,
        owner_id: req.session.user.id,
      });

      return res.json({ newMeeting }); // что нужно вернуть после создания meeting ?
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
};

const editMeeting = async (req, res) => {
  const { id } = req.params;
  let updatedFields = Object.entries(req.body).filter((el) => el[1]);
  if (updatedFields.length) {
    updatedFields = Object.fromEntries(updatedFields);
    try {
      // eslint-disable-next-line max-len
      const [, updatedMeeting] = await Meeting.update(updatedFields, {
        where: { id },
        returning: true,
        plain: true,
        raw: true,
      });
      return res.json(updatedMeeting);// что нужно вернуть после редактирования meeting ?
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(418);
};

const getMeeting = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const currentMeeting = await Meeting.findByPk(id);
    res.json(currentMeeting); // возвращает 1 meeting
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllMeetings = async (req, res) => {
  try {
    const allMeetings = await Meeting.findAll();
    return res.json(allMeetings); // возвращает все meeting
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteMeeting = async (req, res) => {
  const { id } = req.params;
  try {
    await Meeting.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  editMeeting,
  getAllMeetings,
  getMeeting,
  createMeeting,
  deleteMeeting,
};