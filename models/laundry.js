'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.laundry.belongsTo(models.user, { foreignKey: "user_id" });
      models.laundry.belongsTo(models.store, { foreignKey: "store_id" });
      models.laundry.hasOne(models.review, { foreignKey: "laundry_id" });
    }
  }
  laundry.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    state: DataTypes.STRING(50),
    category: DataTypes.STRING(50),
    phone: DataTypes.STRING(50),
    address: DataTypes.STRING(500),
    img: DataTypes.STRING(500),
    memo: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'laundry',
  });
  return laundry;
};