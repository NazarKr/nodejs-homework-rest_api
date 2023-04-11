const express = require("express");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/users");
const router = express.Router();

const ctrl = require("../../controllers/auth-controller");

//
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
