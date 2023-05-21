const { toJSON } = require('./plugins');
const { counterTypes } = require('../config/counter');

module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    'PUBLIC_GOAL_REPEATABLE_PACKAGE',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      incProgress: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.TEXT('medium'),
        allowNull: true,
        defaultValue: '',
      },
      counterType: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [counterTypes.WEEKLY, counterTypes.MONTHLY, counterTypes.YEARLY],
      },
      yearlyCounter: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      monthlyCounter: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      weeklyCounter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      goalPackageId: {
        type: Sequelize.INTEGER,
        ref: 'PUBLIC_GOAL_PACKAGE',
        required: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        ref: 'User',
        required: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Token;
};
