const express = require("express");
const ctrl = require("../../controllers/contacts-controller")
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contacts");
const {authenticate} = require('../../middlewares')

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContacts
);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateContacts
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, ctrl.deleteContacts);

module.exports = router;
