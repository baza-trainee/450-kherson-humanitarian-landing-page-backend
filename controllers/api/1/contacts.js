/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const ContactsDBModel = require("../../../models/api/1/Contacts");
const ContactsReqDTO = require("../../../dto/api/1/req/contacts.dto");
const ContactsDBDTO = require("../../../dto/api/1/db/contacts.dto");

const getContacts = async (req, res, next) => {
  try {
    const result = await ContactsDBModel.findOne({}).exec();
    if (!result) {
      return res.status(200).json(new ContactsReqDTO("", ""));
    }
    res.status(200).json(new ContactsReqDTO(result.email, result.address));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateContacts = async (req, res, next) => {
  try {
    const contactsToSave = new ContactsDBDTO(req.body.email, req.body.address);

    let currentContacts = await ContactsDBModel.findOne({}).exec();

    if (!currentContacts) {
      const result = await new ContactsDBModel(contactsToSave).save();
      return res
        .status(200)
        .json(new ContactsReqDTO(result.email, result.address));
    }

    const result = await ContactsDBModel.findByIdAndUpdate(
      currentContacts._id,
      contactsToSave,
      {
        returnDocument: "after",
      }
    );
    res.status(200).json(new ContactsReqDTO(result.email, result.address));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getContacts, updateContacts };
