const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON } = require('./plugins');
const { roles } = require('../config/roles');

const Todo = (sequelize, Sequelize) => {
  const Todo = sequelize.define(
    'TodoData',
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
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dou: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      user: {
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
  return Todo;
};

module.exports = Todo;
