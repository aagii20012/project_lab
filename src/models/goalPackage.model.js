const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');
const User = require('./user.model');

module.exports = (sequelize, Sequelize) => {
  const User = require('./user.model')(sequelize, Sequelize);
  const Token = sequelize.define(
    'PUBLIC_GOAL_PACKAGE',
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
      progressLimit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.TEXT('medium'),
        allowNull: true,
        defaultValue: '',
      },
      userId: {
        type: Sequelize.INTEGER,
        ref: 'User',
        required: true,
        allowNull: false,
      },
      category: {
        type: Sequelize.INTEGER,
        ref: 'CATEGORY',
        defaultValue: 1,
        required: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  Token.belongsTo(User);
  return Token;
};
