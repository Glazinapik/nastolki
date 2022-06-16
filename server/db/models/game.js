const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Theme, {
        foreignKey: 'theme_id',
      });
    }
  }
  Game.init({
    title: DataTypes.STRING,
    img: DataTypes.TEXT,
    text: DataTypes.TEXT,
    theme_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
