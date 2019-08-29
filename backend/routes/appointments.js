// Endpoints for appointments 

const Appointment = require("../models/appointment");
const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");


router.get('/', async function (req, res, next) {
    try {
        let appointments = await Appointment.findAll();
        return res.json({ appointments });
    } catch (err) {
        return next(err)
    }

});

router.get('/:email', async function (req, res, next) {
    try {
        let appointments = await Appointment.findAppointmentsByUser(req.params.email);
        return res.json({ appointments });
    } catch (err) {
        next(err)
    }

});

module.exports = router;