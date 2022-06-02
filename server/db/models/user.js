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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true,
    },
    photo: DataTypes.STRING,
    info: DataTypes.TEXT,
    gender: DataTypes.STRING,
    dateborn: DataTypes.STRING,
    city: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
