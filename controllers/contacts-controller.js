const { ctrlWrapper } = require("../utils/");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { HttpError } = require("../helpers/index");


const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(result);
};

const addContacts = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const updateContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  res.json(result);
};

const deleteContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addContacts: ctrlWrapper(addContacts),
  updateContacts: ctrlWrapper(updateContacts),
  deleteContacts: ctrlWrapper(deleteContacts)
};
