const express = require("express");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/users");
const ctrl = require("../../controllers/auth-controller");
const { authenticate, upload } = require("../../middlewares");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/y/verif:verificationToken", ctrl.verify);

router.post("/resend-verify-email", validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/users/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router;
