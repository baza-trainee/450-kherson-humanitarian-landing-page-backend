/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const {
  isTextValid,
  isEmailValid,
  isPhoneNumberValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Contact object is valid .
 */

function isValidContact(req, res, next) {
  try {
    const { email, address, phone } = req.body;

    // check picture
    const isEmail = isEmailValid(
      email,
      componentConfig.contacts.email.minLength,
      componentConfig.contacts.email.maxLength
    );

    // check address
    const isAddress = isTextValid(
      address,
      componentConfig.contacts.address.minLength,
      componentConfig.contacts.address.maxLength
    );

    // check phone number
    const isPhone =
      phone === "" ||
      isPhoneNumberValid(
        phone,
        componentConfig.contacts.phone.minLength,
        componentConfig.contacts.phone.maxLength
      );

    if (req.method === "PUT") {
      if (!(isEmail && isAddress && isPhone)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "Помилка на боці серверу" });
  }
}

module.exports = {
  isValidContact,
};
