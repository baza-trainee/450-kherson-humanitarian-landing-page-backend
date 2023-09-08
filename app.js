/*
 * Copyright (c) 2023 Volodymyr Nerovnia <nerv@i.ua>,
 *                    Oleksandr Pavlishchev <velogitara@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * SPDX-License-Identifier: MIT
 */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const config = require("./config/app");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var api1Router = require("./routes/api1");

const helmet = require("helmet");

require("dotenv").config();

var app = express();

app.use(helmet());
app.disable("x-powered-by");

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use("/resources", express.static(path.join(__dirname, "public")));
app.use(
  "/resources/documents/company",
  express.static(path.join(__dirname, "public/documents/company"))
);

//app.use('/', indexRouter);
app.use("/auth", authRouter);
app.use("/api/v1", api1Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message: message });
});

const startExpress = async () => {
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
};

const startMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB сервер запущений");
  } catch (err) {
    console.log("Помилка при запуску MongoDB серверу");
    setTimeout(() => {
      startMongoDB();
    }, config.server.MongoDB.restartSec);
  }
};
const startServer = async () => {
  try {
    await startMongoDB();
    startExpress();
    console.log("API Server чекає на отримання запитів...");
  } catch (err) {
    console.log("Помилка при запуску сервера");
  }
};

startServer();

module.exports = app;
