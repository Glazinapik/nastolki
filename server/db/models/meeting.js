const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsToMany(User, { through: 'Players', foreignKey: 'meeting_id' });
      this.belongsTo(User, {
        foreignKey: 'owner_id',
        as: 'owner',
      });
    }
  }
  Meeting.init({
    title: DataTypes.STRING,
    place: DataTypes.STRING,
    date: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Meeting',
  });
  return Meeting;
};
