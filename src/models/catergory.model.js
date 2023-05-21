const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    'CATEGORY',
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
      title1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descriptin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descriptin1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return Token;
};
