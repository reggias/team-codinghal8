'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.laundry, { foreignKey: "user_id" });
    }
  }
  user.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING(50),
    },
    nickname: {
      unique: true,
      type: DataTypes.STRING(50),
    },
    password: DataTypes.STRING(200),
    email: {
      unique: true,
      type: DataTypes.STRING(50),
    },
    point: {
      defaultValue: 1000000,
      type: DataTypes.BIGINT.UNSIGNED
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};