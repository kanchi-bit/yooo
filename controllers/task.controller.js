const Task = require('../models/task.model');

let cache = {
  data: null,
  time: null
};

const CACHE_TIME = 60 * 1000;

// GET TASKS
exports.getTasks = async (req, res) => {
  const now = Date.now();

  if (cache.data && now - cache.time < CACHE_TIME) {
    return res.json({ source: "cache", data: cache.data });
  }

  const tasks = await Task.find({ userId: req.user.id });

  cache = {
    data: tasks,
    time: now
  };

  res.json({ source: "db", data: tasks });
};

// CREATE TASK
exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user.id
  });

  cache = { data: null, time: null }; // invalidate

  res.json(task);
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  cache = { data: null, time: null };

  res.json(task);
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  cache = { data: null, time: null };

  res.json({ msg: "Deleted" });
};