const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON } = require('./plugins');
const { roles } = require('../config/roles');
const User = require('./user.model');

const Goal = (sequelize, Sequelize) => {
  const Goal = sequelize.define(
    'GoalData',
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
      measured: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isGreaterThanProgress(value) {
            if (parseInt(value) <= parseInt(this.progress)) {
              throw new Error('Total must be greater than progress.');
            }
          },
        },
      },
      description: {
        type: Sequelize.STRING,
      },
      progress: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
  return Goal;
};

module.exports = Goal;
