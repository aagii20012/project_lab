const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    'COMMENT',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descriptin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      commentId: {
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
      indexes: [
        {
          name: 'category_uniqie_comment',
          fields: ['goalPackageId', 'userId', 'createdAt'],
        },
      ],
    }
  );
  return Token;
};
