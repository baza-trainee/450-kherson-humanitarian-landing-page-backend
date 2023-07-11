const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactPath = path.join(__dirname, './contacts.json');

const getAll = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async id => {
  const data = await getAll();
  const result = data.find(contact => contact.id === id);
  return result || null;
};

const addContact = async body => {
  const contacts = await getAll();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await getAll();
  const index = contacts.findIndex(i => i.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContactById = async id => {
  const contacts = await getAll();
  const index = contacts.findIndex(i => i.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  getAll,
  getContactById,
  removeContactById,
  addContact,
  updateContact,
};
