'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.review.belongsTo(models.laundry, {
                foreignKey: 'laundry_id',
            });
        }
    }
    review.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            star: DataTypes.INTEGER,
            content: DataTypes.STRING(500),
            imgPath: DataTypes.STRING(500),
        },
        {
            sequelize,
            modelName: 'review',
        }
    );
    return review;
};
