const { Game, Theme } = require('../../db/models');

const getRelatedGames = async (req, res) => {
  const { id } = req.params;
  try {
    const RelatedGames = await Theme.findOne({
      where: { id },
      include: Game,
    });
    res.json(RelatedGames); // возвращает 1 тему с вложенными играми
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllGames = async (req, res) => {
  try {
    const allGames = await Game.findAll();

    return res.json(allGames); // возвращает все games
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  getRelatedGames,
  getAllGames,
};
