/*
 * Copyright (c) 2023 Baza Trainee Ukraine
 * Developers:
 *   - Volodymyr Nerovnia
 *   - Oleksandr Pavlishchev
 *
 * SPDX-License-Identifier: MIT
 */

const path = require("path");
const { existsSync } = require("node:fs");
const { ObjectId } = require("mongodb");
const mimeImageTypes = require("../../../dictionaries/mime/pictures");
const mimeDocumentTypes = require("../../../dictionaries/mime/documents");
const mimeReportTypes = require("../../../dictionaries/mime/reports");
const arrColorsForFront = require("../../../dictionaries/front-team/colors");

const getBinarySize = (data) => Buffer.from(data, "base64").length;

function isValidPictureMimeType(type) {
  return isValidMimeType(mimeImageTypes, type);
}

function isExistMimeForPicture(ext) {
  return isExistMimeForFileExt(mimeImageTypes, ext);
}

function isExistMimeForFileExt(arrMimes, ext) {
  return arrMimes.find((mime) => mime.extension === ext);
}

function isValidMimeType(arrMimes, type) {
  if (!type || type === "") {
    return false;
  }
  if (arrMimes.find((mtype) => mtype.mimeName === type)) {
    return true;
  }
  return false;
}

function isValidFilename(filename) {
  const pattern = /^[a-zA-Z0-9._-]+$/;
  return pattern.test(filename);
}

function isImagePathValid(picObject, realPathToImage, routeToImage) {
  const fileName = picObject.image.replace(`${routeToImage}/`, "");
  if (!isValidFilename(fileName)) {
    return false;
  }
  if (!isExistMimeForPicture(path.extname(fileName))) {
    return false;
  }
  if (!isFileExists(`${realPathToImage}${fileName}`)) {
    return false;
  }
  return true;
}

function isImageContentValid(picObject, maxSizekB) {
  if (
    isValidPictureMimeType(picObject?.mime_type) &&
    getBinarySize(picObject?.image) <= maxSizekB * 1024
  ) {
    return true;
  }
  return false;
}

function isImageValid(picObject, maxSizekB) {
  return isImageContentValid(picObject, maxSizekB);
}

function isImageValidI(
  picObject,
  maxSizekB,
  realPathToImage = "",
  routeToImage = ""
) {
  if (picObject?.mime_type === "text/plain") {
    return isImagePathValid(picObject, realPathToImage, routeToImage);
  }
  return isImageContentValid(picObject, maxSizekB);
}

function isFileExists(path) {
  if (existsSync(path)) {
    return true;
  }
  return false;
}

function isIBANValid(iban) {
  return /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/.test(
    iban
  );
}

function isIPNValid(ipn) {
  return /^\d{8}(\d{2})?$/.test(ipn);
}

function isCurrencyValid(currency) {
  return /^[A-Z]{3}?$/.test(currency);
}

function isDocumentValid(docObject, maxSize) {
  return isFileValid(docObject, maxSize, mimeDocumentTypes);
}

function isReportValid(reportObject, maxSize) {
  return isFileValid(reportObject, maxSize, mimeReportTypes);
}

function isFileValid(fileObject, maxSize, arrMimes) {
  if (
    isValidMimeType(arrMimes, fileObject?.mime) &&
    getBinarySize(fileObject?.data) <= maxSize
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

function isFrontColorValid(color) {
  if (arrColorsForFront.find((elcolor) => elcolor === color)) {
    return true;
  }
  return false;
}

function isTextValid(text, minLength, maxLength) {
  // Define a regular expression pattern to match various text exclude injection code
  //const injectionPattern = /(\$|\{|\}|\[|\]|\\|\/|\(|\)|\+|\*|\?|\^|\|)/;
  const injectionPattern = /^[A-Za-z0-9\u0400-\u04FFіїєґІЇЄҐ\/,.():!-' ]*$/;

  if (text === null || typeof value === "object") {
    return false;
  }
  // Check if the length is within the minLength to maxLength range
  if (text?.length < minLength || text?.length > maxLength) {
    return false;
  }

  // Check if the text include injection code
  if (!injectionPattern.test(text)) {
    console.log(text);
    console.log(false);
    return false;
  }

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

function isPicturesArray(arrPictures, maxSizekB, realPathToImage) {
  if (Array.isArray(arrPictures)) {
    return arrPictures.every((picture) =>
      isImageValid(picture, maxSizekB, realPathToImage)
    );
  }
  return false;
}

function isGeolocationEncodeDecodeComparable(geolocation) {
  return atob(btoa(geolocation)) === geolocation;
}

module.exports = {
  isIntegerValid,
  isImageValid,
  isImageContentValid,
  isColorValid,
  isFrontColorValid,
  isTextValid,
  isDateValid,
  isIdValid,
  isBooleanValid,
  isPicturesArray,
  isEmailValid,
  isPhoneNumberValid,
  isDocumentValid,
  isReportValid,
  isCurrencyValid,
  isIBANValid,
  isIPNValid,
  isGeolocationEncodeDecodeComparable,
};
