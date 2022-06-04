const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");
const User = require("../model/userModel");
//@desc get goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//@desc set goal
//@route POST /api/goals
//@access private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);

    throw new Error("please add text field!");
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  res.status(200).json(goal);
});

//@desc update goal
//@route PUT /api/goals
//@access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.send(400);

    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);

    throw new Error("not found user");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error("not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc delete goal
//@route DELETE /api/goals
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.send(400);

    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);

    throw new Error("not found user");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error("not authorized");
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoals,
  updateGoal,
  setGoal,
  deleteGoal,
};
