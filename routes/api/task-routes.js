const express = require("express");
const ctrl = require("../../controllers/task-controller");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/task");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllTasks);

// router.get("/:contactId", authenticate, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchemaTask),
  ctrl.addTasks
);

// router.put("/:contactId", authenticate, ctrl.getById);

router.patch("/:taskId/status", authenticate, ctrl.updateStatusTasks);

router.delete("/:taskId", authenticate, ctrl.deleteTasks);


module.exports = router;