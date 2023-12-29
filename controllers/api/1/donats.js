/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const DonatsDBModel = require("../../../models/api/1/Donats");
const DonatsDTO = require("../../../dto/api/1/req/donats.dto");
const appConfig = require("../../../config/app");

const createDonat = async (req, res, next) => {
  try {
    const { id, currency, recipient, IBAN, IPN, paymentPurpose } = req.body;

    const donat = (
      await new DonatsDBModel({
        currency,
        recipient,
        IBAN,
        IPN,
        paymentPurpose,
      }).save()
    )._doc;
    const donatsDTOs = new DonatsDTO(
      donat._id,
      donat.currency,
      donat.recipient,
      donat.IBAN,
      donat.IPN,
      donat.paymentPurpose
    );
    res.status(200).json(donatsDTOs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getDonats = async (req, res, next) => {
  try {
    const query = DonatsDBModel.where({});
    const donats = await query.find();
    const result = donats.map(
      (project) =>
        new DonatsDTO(
          project._doc._id,
          project._doc.currency,
          project._doc.recipient,
          project._doc.IBAN,
          project._doc.IPN,
          project._doc.paymentPurpose
        )
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getDonatsOnlyIds = async (req, res, next) => {
  try {
    const query = DonatsDBModel.where({});
    const result = (await query.find().select("_id")).map((donat) => donat._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const getDonatById = async (req, res, next) => {
  try {
    const query = DonatsDBModel.where({ _id: req.params.id });
    const donat = await query.findOne();
    if (donat) {
      return res
        .status(200)
        .json(
          new DonatsDTO(
            donat._doc._id,
            donat._doc.currency,
            donat._doc.recipient,
            donat._doc.IBAN,
            donat._doc.IPN,
            donat._doc.paymentPurpose
          )
        );
    }
    return res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateDonat = async (req, res, next) => {
  try {
    const donatToUpdate = new DonatsDTO(
      req.body.id,
      req.body.currency,
      req.body.recipient,
      req.body.IBAN,
      req.body.IPN,
      req.body.paymentPurpose
    );

    const donat = await DonatsDBModel.findByIdAndUpdate(
      req.body.id,
      donatToUpdate,
      {
        returnDocument: "after",
      }
    );
    if (donat) {
      return res
        .status(200)
        .json(
          new DonatsDTO(
            donat._doc._id,
            donat._doc.currency,
            donat._doc.recipient,
            donat._doc.IBAN,
            donat._doc.IPN,
            donat._doc.paymentPurpose
          )
        );
    }
    res.status(404).json({
      message: "Ресурс не знайдено",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const deleteDonat = async (req, res, next) => {
  try {
    const donat = await DonatsDBModel.findOneAndRemove({
      _id: req.params.id,
    });

    if (!donat) {
      return res.status(404).json({
        message: "Ресурс не знайдено",
      });
    }
    res
      .status(200)
      .json(
        new DonatsDTO(
          donat._doc._id,
          donat._doc.currency,
          donat._doc.recipient,
          donat._doc.IBAN,
          donat._doc.IPN,
          donat._doc.paymentPurpose
        )
      );
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = {
  createDonat,
  getDonatById,
  updateDonat,
  deleteDonat,
  getDonatsOnlyIds,
  getDonats,
};
