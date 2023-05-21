const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    'PUBLIC_GOAL_TASK',
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
