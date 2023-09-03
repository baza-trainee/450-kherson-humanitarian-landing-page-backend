/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

const { isImageValid, isColorValid, isTextValid } = require("../../../utils/helpers/api/simpleIssueValidator");

/**
 * Check if Hero object is valid .
 */

function isValidHero(req, res, next) {
  //console.log(req.headers);
  //console.log(req.body);
  try {
    const { View, Title, Subtitle} = req.body;

    // check View
    const isView = (isImageValid(View.picture, 500) && 
                (isColorValid(View.bgColorStart)) && 
                (isColorValid(View.bgColorEnd)));
  
    // check Title
    const isTitle = (isTextValid(Title.text, minLength, maxLength) && 
                (isColorValid(Title.colorStart)) && 
                (isColorValid(Title.colorMiddle)) && 
                (isColorValid(Title.colorEnd)));
  
  
    // check Subtitle
    const isSubtitle = (isTextValid(Subtitle.text, minLength, maxLength) && 
                (isColorValid(Subtitle.colorStart)) && 
                (isColorValid(Subtitle.colorMiddle)) && 
                (isColorValid(Subtitle.colorEnd)));

    if( isView && isTitle && isSubtitle) {
      next();
    } else {
      return res.status(406).json({message: "Помилка валідації даних"})
    }
  } catch (err) {
    return res.status(406).json({message: "Помилка валідації даних"})
  }
  /*
  if (req.method === "OPTIONS") {
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return res.status(403).json({message: "Користувач не авторизований"})
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedData;
    next();
  }catch (err) {
    return res.status(403).json({message: "Користувач не авторизований"})
  }*/
}

module.exports = {
  isValidHero
};
