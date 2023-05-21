const dbConfig = require('../config/config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.pg.DB, dbConfig.pg.USER, dbConfig.pg.PASSWORD, {
  host: dbConfig.pg.HOST,
  dialect: dbConfig.pg.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pg.pool.max,
    min: dbConfig.pg.pool.min,
    acquire: dbConfig.pg.pool.acquire,
    idle: dbConfig.pg.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports.User = require('./user.model')(sequelize, Sequelize);
module.exports.Token = require('./token.model')(sequelize, Sequelize);
module.exports.Category = require('./catergory.model')(sequelize, Sequelize);
module.exports.GoalPackage = require('./goalPackage.model')(sequelize, Sequelize);
module.exports.GoalTask = require('./goalTask.model')(sequelize, Sequelize);
module.exports.GoalRepeatableTask = require('./goalRepeatAbleTask.model')(sequelize, Sequelize);
// module.exports.Comment = require('./comment.model')(sequelize, Sequelize);
// module.exports.Favorite = require('./favorite.model')(sequelize, Sequelize);
module.exports.db = db;
