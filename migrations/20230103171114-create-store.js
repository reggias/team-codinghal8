'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('store', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50)
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING(200)
      },
      email: {
        unique: true,
        type: Sequelize.STRING(50)
      },
      point: {
        defaultValue: 0,
        type: Sequelize.BIGINT.UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('store');
  }
};