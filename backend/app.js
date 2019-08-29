/** Express app for elevate. */
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

/** import routes */

const usersRoutes = require('./routes/users');
const salariesRoutes = require('./routes/salaries');
const authRoutes = require('./routes/auth');
const questionsRoutes = require('./routes/questions');
const calendlyWebhookRoute = require("./routes/calendlyWebhook");
const appointmentsRoutes = require("./routes/appointments");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** routes */
app.use('/login', authRoutes);
app.use('/users', usersRoutes);
app.use('/salaries', salariesRoutes);
app.use('/questions', questionsRoutes);
app.use('/webhook', calendlyWebhookRoute);
app.use('/appointments', appointmentsRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;



