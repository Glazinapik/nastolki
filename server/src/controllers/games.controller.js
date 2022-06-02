const { Theme, Game } = require('../../db/models');

const getRelatedGames = async (req, res) => {
  try {
    const RelatedGames = await Theme.findall({ include: { model: Game } });
    res.json(RelatedGames); // возвращает 1 тему с вложенными играми
  } catch (error) {
    res.sendStatus(500);
  }
};
const getAllGames = async (req, res) => {
  try {
    const allGames = await Theme.findAll({ include: { model: Game } });

    return res.json(allGames); // возвращает все games
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  getRelatedGames,
  getAllGames,
};
