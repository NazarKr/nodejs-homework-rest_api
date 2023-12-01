const { Contact } = require("../models/contacts");
const { ctrlWrapper } = require("../utils/");

const { HttpError } = require("../helpers/index");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query; // pagination
  const skip = (page - 1) * limit; // pagination

  let filter = null;
  if (favorite === "false" || favorite === "true") {
    const isFavoriteTrue = favorite === "true";
    filter = { favorite: isFavoriteTrue };
  }  // filter favorite

  const result = await Contact.find(
    { owner, ...filter },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const addContacts = async (req, res) => {
  const { id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const deleteContacts = async (req, res) => {
  const { contactId } = req.params;
  
  const result = await Contact.findByIdAndDelete(contactId);
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteContacts: ctrlWrapper(deleteContacts),
};
