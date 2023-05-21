const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    'FAVORITE',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [0, 1],
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
          name: 'category_uniqie_like',
          fields: ['goalPackageId', 'userId', 'createdAt'],
        },
      ],
    }
  );
  return Token;
};
