'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // laundry 테이블에서 user테이블 id컬럼 fk
    await queryInterface.addColumn("laundry", "user_id", {
      allowNull: false,
      type: Sequelize.STRING(50)
    });
    await queryInterface.addConstraint('laundry', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'laundry_userid_fk',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // laundry 테이블에서 store테이블 id컬럼 fk 
    await queryInterface.addColumn("laundry", "store_id", {
      allowNull: false,
      type: Sequelize.STRING(50)
    });
    await queryInterface.addConstraint('laundry', {
      fields: ['store_id'],
      type: 'foreign key',
      name: 'laundry_storeid_fk',
      references: {
        table: 'store',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // review 테이블에서 laundry테이블 id컬럼 fk 
    await queryInterface.addColumn("review", "laundry_id", {
      allowNull: false,
      type: Sequelize.INTEGER
    });
    await queryInterface.addConstraint('review', {
      fields: ['laundry_id'],
      type: 'foreign key',
      name: 'review_laundryid_fk',
      references: {
        table: 'laundry',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
