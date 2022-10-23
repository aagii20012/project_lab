const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    'Token',
    {
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true,
      },
      user: {
        type: Sequelize.INTEGER,
        ref: 'User',
        required: true,
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      blacklisted: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Token;
};
