const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Meeting }) {
      this.belongsToMany(Meeting, { through: 'Players', foreignKey: 'user_id' });
      this.hasMany(Meeting, {
        foreignKey: 'owner_id',
        as: 'owner',
      });
    }
  }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    photo: DataTypes.STRING,
    info: DataTypes.TEXT,
    gender: DataTypes.STRING,
    dateborn: DataTypes.STRING,
    city: DataTypes.STRING,
    rating: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
