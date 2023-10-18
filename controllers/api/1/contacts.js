/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const ContactsDBModel = require("../../../models/api/1/Contacts");

const getContacts = async (req, res, next) => {
  try {
    const query = (await ContactsDBModel.findOne({}).exec()) ?? {
      _doc: {
        email: "",
        address: "",
        phone: "",
      },
    };
    const { email, address, phone } = query._doc;

    const result = {
      email,
      address,
      phone,
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateContacts = async (req, res, next) => {
  try {
    const { email, address, phone } = req.body;

    const contactsToSave = { email, address, phone };

    let currentContacts = await ContactsDBModel.findOne({}).exec();

    if (!currentContacts) {
      currentContacts = await new ContactsDBModel(contactsToSave).save();
      const { _id, __v, ...clearResult } = currentContacts._doc;
      return res.status(200).json(clearResult);
    }

    const result = await ContactsDBModel.findByIdAndUpdate(
      currentContacts._id,
      contactsToSave,
      {
        returnDocument: "after",
      }
    );

    const { _id, __v, ...clearResult } = result._doc;
    res.status(200).json(clearResult);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getContacts, updateContacts };
