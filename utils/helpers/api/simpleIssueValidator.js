/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */
const { ObjectId } = require("mongodb");
const mimeImageTypes = require("../../../dictionaries/mime/pictures");

const getBinarySize = (data) => Buffer.from(data, "base64").length;

function isValidPictureMimeType(type) {
  if (!type || type === "") {
    return false;
  }
  if (mimeImageTypes.find((mtype) => mtype.mimeName === type)) {
    return true;
  }
  return false;
}

function isImageValid(picObject, maxSizekB) {
  const base64Pattern =
    /^data:image\/(png|jpeg|jpg|gif);base64,([A-Za-z0-9+/]+={0,2})$/;
  if (
    picObject?.image_data === "base64_encoded_image_data_here" &&
    isValidPictureMimeType(picObject?.mime_type) &&
    getBinarySize(picObject?.image) <= maxSizekB * 1024 &&
    base64Pattern.test(picObject?.image)
  ) {
    return true;
  }
  return false;
}

function isColorValid(color) {
  if (!color) {
    return false;
  }
  const colorPattern =
    /^(#([0-9A-Fa-f]{3}){1,2}|(rgb|hsl)a?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\))$/i;
  return colorPattern.test(color);
}

function isTextValid(text, minLength, maxLength) {
  // Define a regular expression pattern to match various text exclude injection code
  //const injectionPattern = /(\$|\{|\}|\[|\]|\\|\/|\(|\)|\+|\*|\?|\^|\|)/;
  if (text === null || typeof value === "object") {
    return false;
  }
  // Check if the length is within the minLength to maxLength range
  if (text?.length < minLength || text?.length > maxLength) {
    return false;
  }

  // Check if the text include injection code
  //if (injectionPattern.test(text)) {
  //return false;
  //}

  return true;
}

function isEmailValid(email, minLength, maxLength) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email && email.length >= minLength && email.length <= maxLength) {
    return emailPattern.test(email);
  }
  return false;
}

function isPhoneNumberValid(phone, minLength, maxLength) {
  const phonePattern = /^(\+\d{1,4})?(\d{10})$/;
  /*
  const phonePattern =
    /^(\+\d{2} ?)?(\(\d{3}\) ?|\d{3}[- ]?)\d{3}[- ]?\d{2}[- ]?\d{2}$/;
*/
  if (phone && phone.length >= minLength && phone.length <= maxLength) {
    return phonePattern.test(phone);
  }
  return false;
}

function isDateValid(inputDate, pminDate, pmaxDate) {
  // Define a regular expression pattern to match various date formats
  const datePattern = [
    /^\d{2}\/\d{2}\/\d{4}$/, // 17/08/2023
    /^\d{2}-\d{2}-\d{4}$/, // 17-08-2023
    /^\d{2}\.\d{2}\.\d{4}$/, // 17.08.2023
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, // "2023-08-17T22:58:38.831Z"
  ];

  let isPatternValid = false;
  datePattern.forEach((p) => {
    if (p.test(inputDate)) {
      isPatternValid = true;
    }
  });

  if (!isPatternValid) {
    return false;
  }

  // Parse the input date into a JavaScript Date object
  const parsedDate = new Date(inputDate);

  // Check if the parsed date is a valid date
  if (isNaN(parsedDate.getTime())) {
    return false;
  }

  // Define the minimum and maximum date boundaries
  const minDate = new Date(pminDate);
  const currentDate = pmaxDate;

  // Check if the parsed date is within the allowed range
  if (parsedDate < minDate || parsedDate > currentDate) {
    return false;
  }

  return true;
}

function isIdValid(id) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

function isBooleanValid(value) {
  return typeof value === "boolean";
}

function isIntegerValid(number, minNumber, maxNumber) {
  if (number && Number.isInteger(number)) {
    if (number >= minNumber && number <= maxNumber) {
      return true;
    }
  }
  return false;
}

function isPicturesArray(arrPictures, maxSizekB) {
  if (Array.isArray(arrPictures)) {
    return arrPictures.every((picture) => isImageValid(picture, maxSizekB));
  }
  return false;
}

module.exports = {
  isIntegerValid,
  isImageValid,
  isColorValid,
  isTextValid,
  isDateValid,
  isIdValid,
  isBooleanValid,
  isPicturesArray,
  isEmailValid,
  isPhoneNumberValid,
};
