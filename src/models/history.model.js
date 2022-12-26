const History = (sequelize, Sequelize) => {
  const History = sequelize.define(
    'HistoryData',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      progress: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      user: {
        type: Sequelize.INTEGER,
        ref: 'User',
        required: true,
        allowNull: false,
      },
      goal: {
        type: Sequelize.INTEGER,
        ref: 'GoalData',
        allowNull: true,
      },
      todo: {
        type: Sequelize.INTEGER,
        ref: 'TodoData',
        allowNull: true,
      },
      step: {
        type: Sequelize.INTEGER,
        ref: 'StepData',
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return History;
};

module.exports = History;
