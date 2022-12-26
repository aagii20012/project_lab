const httpStatus = require('http-status');
const { historyService } = require('../services/index');
const catchAsync = require('../utils/catchAsync');

const test = catchAsync(async (req, res) => {
  const data = req.body;
  const goal = await historyService.getAllHistoryWithFilter(data[0], data[1], data[2]);
  res.status(httpStatus.OK).send({ goal });
});

module.exports = {
  test,
};
