'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  store.init({
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
      defaultValue: 0,
      type: DataTypes.BIGINT.UNSIGNED
    },
  }, {
    sequelize,
    modelName: 'store',
  });
  return store;
};