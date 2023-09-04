/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */
const { ObjectId } = require('mongodb');
const getBinarySize = (data) => Buffer.from(data, 'base64').length;

function isImageValid(picObject, maxSizekB) {
  const base64Pattern = /^data:image\/(png|jpeg|jpg|gif);base64,([A-Za-z0-9+/]+={0,2})$/;
  if ((picObject?.image_data === "base64_encoded_image_data_here") && 
    (picObject?.mime_type !== "") && 
    (getBinarySize(picObject?.image) <= maxSizekB * 1024) &&
    (base64Pattern.test(picObject?.image))) {
    return true;
  }
  return false;
}

function isColorValid(color) {
  const colorPattern = /^(#([0-9A-Fa-f]{3}){1,2}|(rgb|hsl)a?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\))$/i;
  return colorPattern.test(color);
}

function isTextValid(text, minLength, maxLength) {
  // Define a regular expression pattern to match various text exclude injection code
  //const injectionPattern = /(\$|\{|\}|\[|\]|\\|\/|\(|\)|\+|\*|\?|\^|\|)/;
  if ((text === null) || (typeof value === 'object')) {
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


function isDateValid(date, pminDate, pmaxDate) {
  // Define a regular expression pattern to match various date formats
  const datePattern = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[13-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:(?:0?[1-9])|(?:1\d)|(?:2[0-8]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  // Check if the input matches the date pattern
  if (!datePattern.test(inputDate)) {
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
  console.log(ObjectId.isValid(id) && new ObjectId(id).toString() === id);
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

function isBooleanValid() {
  return typeof value === 'boolean';
}

module.exports = {
  isImageValid,
  isColorValid,
  isTextValid,
  isDateValid,
  isIdValid,
  isBooleanValid
};