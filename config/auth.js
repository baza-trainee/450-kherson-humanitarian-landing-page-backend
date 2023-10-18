/*
 * Copyright (c) 2023 Baza Trainee Ukraine
  Developers:
    - Volodymyr Nerovnia 
    - Oleksandr Pavlishchev
    
 * SPDX-License-Identifier: MIT
 */

const getTime = (time) => {
  return (
    time.days * 24 * 60 * 60 * 1000 +
    time.hours * 60 * 60 * 1000 +
    time.minutes * 60 * 1000 +
    time.seconds * 1000
  );
};

module.exports = {
  token: {
    expiresTime: getTime({
      days: 1,
      hours: 0,
      minutes: 15,
      seconds: 0,
    }),
  },
  link: {
    expiresTime: getTime({
      days: 0,
      hours: 1,
      minutes: 0,
      seconds: 0,
    }),
  },
  username: {
    minChars: 5,
    maxChars: 15,
  },
  password: {
    minChars: 8,
    maxChars: 20,
  },
  limitAuthRequests: {
    // 24 hours
    timeWindow: 24 * 60 * 60 * 1000,
    trys: 20,
  },
};
