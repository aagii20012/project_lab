const Step = (sequelize, Sequelize) => {
  const Step = sequelize.define(
    'StepData',
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
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'new',
      },
      progress: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isRepeatable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      goal: {
        type: Sequelize.INTEGER,
        ref: 'GoalData',
        required: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Step;
};

module.exports = Step;
