const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require("nanoid");


const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
