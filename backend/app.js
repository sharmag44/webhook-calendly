/** Express app for calendly demo. */
const express = require("express");
const app = express();
// helper function to parse big json object from calendly
const { parseResponse }= require("./helperWebhook")



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint for webhook to receive calendly events
app.post('/',function (req, res, next)  {
  let event;
  try {
    event = req.body
  }
  catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.event) {
      
    case 'invitee.created':
      const createdEvent = event.payload;
      parseResponse(createdEvent);
      break;
    case 'invitee.canceled':
      const canceledEvent = event.payload;
      parseResponse(canceledEvent);
      break;
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
});

module.exports = app;