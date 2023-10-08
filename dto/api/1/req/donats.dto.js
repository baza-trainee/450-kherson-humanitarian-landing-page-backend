/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

class DonatsDTO {
  constructor(id, currency, recipient, IBAN, IPN, paymentPurpose) {
    this.currency = currency;
    this.recipient = recipient;
    this.IBAN = IBAN;
    this.IPN = IPN;
    this.paymentPurpose = paymentPurpose;
    this.id = id;
  }
}

module.exports = DonatsDTO;
