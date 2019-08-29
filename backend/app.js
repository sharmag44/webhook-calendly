/** Express app for calendly demo. */
const express = require("express");
const app = express();
const ExpressError = require("./expressError");

const { parseResponse } = require("./helperWebhook");
const { create, cancel} = require("./models/appointment");

const jsonschema = require("jsonschema");
const appointmentSchema = require("./schemas/appointmentSchema.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint for webhook to receive calendly events
// To test webhook/calendly functionality locally with ngrok you must configure this endpoint as '/'
app.post('/webhook', async function (req, res, next) {
  try {
    // parse request payload then validate
    const eventPayload = req.body.payload;
    const parsedObj = parseResponse(eventPayload);
    const validate = jsonschema.validate(parsedObj, appointmentSchema);

    if (!validate.valid) {
      let listOfErrors = validate.errors.map(error => error.stack);
      throw new ExpressError(listOfErrors, 400);
    }
    // Handle the event
    switch (req.body.event) {
      case 'invitee.created':
        await create(parsedObj);
        break;
      case 'invitee.canceled':
        await cancel(parsedObj);
        break;
      default:
        // Unexpected event type
        return res.status(400).end();
    }
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = app;