/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const {
  isIdValid,
  isTextValid,
  isCurrencyValid,
  isIBANValid,
  isIPNValid,
} = require("../../../utils/helpers/api/simpleIssueValidator");
const componentConfig = require("../../../config/api/v1/components");

/**
 * Check if Activity object is valid .
 */

function isValidDonat(req, res, next) {
  try {
    const { currency, recipient, IBAN, IPN, paymentPurpose } = req.body;

    const id = req.body.id ? req.body.id : req.params.id;

    // check id
    const isId = isIdValid(id);
    // check picture
    const isCurrency = isCurrencyValid(currency);
    const isRecipient = isTextValid(
      recipient,
      componentConfig.donats.recipient.minLength,
      componentConfig.donats.recipient.maxLength
    );
    const isIBAN = isIBANValid(IBAN);
    const isIPN = isIPNValid(IPN);
    const isPaymentPurpose = isTextValid(
      paymentPurpose,
      componentConfig.donats.paymentPurpose.minLength,
      componentConfig.donats.paymentPurpose.maxLength
    );

    if (req.method === "DELETE" || req.method === "GET") {
      if (!isId) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "POST") {
      if (!(isCurrency && isRecipient && isIBAN && isIPN && isPaymentPurpose)) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    if (req.method === "PUT") {
      if (
        !(
          isId &&
          isCurrency &&
          isRecipient &&
          isIBAN &&
          isIPN &&
          isPaymentPurpose
        )
      ) {
        return res.status(406).json({ message: "Помилка валідації даних" });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(406).json({ message: "-Помилка валідації даних" });
  }
}

module.exports = {
  isValidDonat,
};
