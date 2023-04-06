const express = require("express");
const ctrl = require("../../controllers/contacts-controller")
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContacts);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContacts);

router.patch("/:contactId/favorite", validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", ctrl.deleteContacts);

module.exports = router;
