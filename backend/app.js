/** Express app for calendly demo. */
const express = require("express");
const app = express();
const ExpressError = require("./expressError");

const { parseResponse } = require("./helperWebhook");
const { create, cancel, findAll, findAppointmentsByUser} = require("./models/appointment");

const jsonschema = require("jsonschema");
const appointmentSchema = require("./schemas/appointmentSchema.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Endpoint for webhook to receive calendly events
// TODO: after testing and before integrating into elevate update route to '/webhook' 
app.post('/', async function (req, res, next) {
  // parse req.body then validate
  const event = req.body.payload;
  const parsedObj = parseResponse(event);

  try {
    const validate = jsonschema.validate(parsedObj, appointmentSchema);

    if (!validate.valid) {
      let listOfErrors = validate.errors.map(error => error.stack);
      throw new ExpressError(listOfErrors, 400);
    }

    // Handle the event
    switch (event.event) {
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

app.get('/', async function (req, res, next) {
  let appointments= await findAll()
  return res.json({ appointments });
})

app.get('/:email', async function (req, res, next) {
  let appointments= await findAppointmentsByUser(req.params.email)
  return res.json({ appointments });
})
module.exports = app;