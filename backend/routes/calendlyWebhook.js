// Endpoint for webhook to receive calendly events

const Appointment = require("../models/appointment");
const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");
const { parseResponse } = require("./helperWebhook");
const jsonschema = require("jsonschema");
const appointmentSchema = require("./schemas/appointmentSchema.json");

// NOTE: To test webhook/calendly functionality locally with ngrok you must configure this endpoint as '/'
router.post('/', async function (req, res, next) {
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
        await Appointment.create(parsedObj);
        break;
      case 'invitee.canceled':
        await Appointment.cancel(parsedObj);
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

module.exports = router;