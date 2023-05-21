const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { goalService, taskService, rtaskService, profleService } = require('../services');
const getToken = require('../utils/getToken');
const ApiError = require('../utils/ApiError');

const getPackges = catchAsync(async (req, res) => {
  const token = getToken(req);
  const body = req.body;
  const userId = await profleService.getUserByToken(token);
  const goals = await goalService.getAllGoalPackage(body, userId);
  console.log(goals);
  res.status(httpStatus.OK).send({ goals });
});

const getPackgesDetail = catchAsync(async (req, res) => {
  const token = getToken(req);
  const id = req.params.id;
  const userId = await profleService.getUserByToken(token);
  const goals = await goalService.getGoalPackageById(id, userId);
  const tasks = await taskService.getTaskByPackageId(goals.id);
  console.log('------------------tasks---------------------');
  console.log(tasks);
  const rtasks = await rtaskService.getTaskByPackageId(goals.id);
  console.log('------------------rtasks---------------------');
  console.log(rtasks);
  console.log('---------------------------------------------');
  const tmp = { goals, tasks: tasks, repeatTask: rtasks };
  res.status(httpStatus.OK).send({ ...tmp });
});

const savePackage = catchAsync(async (req, res) => {
  const data = req.body;
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Nonono');
  }
  let goals, tasks, rtasks;
  if (data.package) {
    goals = await goalService.createGoalPackage(data.package, userId);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Package missing');
  }
  if (data.tasks) {
    tasks = await taskService.createTaskWithUserAndPackage(data.tasks, userId, goals);
  }
  if (data.repeatTask) {
    rtasks = await rtaskService.createTaskWithUserAndPackage(data.repeatTask, userId, goals);
  }
  goals['tasks'] = tasks;
  goals['repeat_task'] = rtasks;
  res.status(httpStatus.CREATED).send({ goals });
});

module.exports = { getPackges, getPackgesDetail, savePackage };
