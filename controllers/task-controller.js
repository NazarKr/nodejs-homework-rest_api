const { HttpError } = require("../helpers");
const { Task } = require("../models/task");
const { ctrlWrapper } = require("../utils");


const getAllTasks = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query; // pagination
  const skip = (page - 1) * limit; // pagination

  let filter = null;
  if (favorite === "false" || favorite === "true") {
    const isFavoriteTrue = favorite === "true";
    filter = { favorite: isFavoriteTrue };
  } // filter favorite

  const result = await Task.find(
    { owner, ...filter },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner");
  res.json(result);
};

const addTasks = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateStatusTasks = async (req, res) => {
  const { taskId } = req.params;
  const { done } = req.body;
  const result = await Task.findByIdAndUpdate(taskId, req.body, {
    done: done,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${taskId} not found`);
  }
  res.status(200).json(result);
};

const deleteTasks = async (req, res) => {
  const { taskId } = req.params;

  const result = await Task.findByIdAndDelete(taskId);
  if (!result) {
    throw HttpError(404, `Contact with ${taskId} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAllTasks: ctrlWrapper(getAllTasks),
  addTasks: ctrlWrapper(addTasks),
  deleteTasks: ctrlWrapper(deleteTasks),
  updateStatusTasks: ctrlWrapper(updateStatusTasks),
};